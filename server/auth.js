// Microsoft sign-in (Entra ID) using Microsoft's MSAL Node library.
//
// How it works:
// 1. Someone who isn't signed in is sent to /auth/signin, which sends them to Microsoft.
// 2. They sign in with their Stott and May account. Microsoft sends them back to /auth/callback.
// 3. The server swaps the one-time code from Microsoft for their details, checks they belong to
//    our organisation, and remembers them in a signed, browser-locked cookie: for 7 days, renewed
//    each time they use the hub, and never longer than 30 days without signing in again.
// 4. /auth/signout forgets them and signs them out of Microsoft too.
import crypto from "node:crypto";
import { Router } from "express";
import cookieSession from "cookie-session";
import { ConfidentialClientApplication, CryptoProvider } from "@azure/msal-node";

const { ENTRA_CLIENT_ID, ENTRA_TENANT_ID, ENTRA_CLIENT_SECRET, SESSION_SECRET, DEV_SIGNIN_AS, NODE_ENV } = process.env;

// The address people use to reach the hub. Microsoft sends people back to <BASE_URL>/auth/callback,
// so it must match a redirect URI registered by IT exactly.
const baseUrl = (process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`).replace(/\/+$/, "");
const redirectUri = `${baseUrl}/auth/callback`;
const signedOutUrl = `${baseUrl}/auth/signed-out`;

const REQUIRED = { ENTRA_CLIENT_ID, ENTRA_TENANT_ID, ENTRA_CLIENT_SECRET, SESSION_SECRET };
const missing = Object.keys(REQUIRED).filter((name) => !REQUIRED[name]);
export const signInConfigured = missing.length === 0;

// For local development before IT's details arrive: DEV_SIGNIN_AS="Your Name" signs you in as that
// name without Microsoft. Only works when NODE_ENV is exactly "development" and Microsoft sign-in
// isn't set up, so it can never switch on in production.
const devUser = !signInConfigured && NODE_ENV === "development" && DEV_SIGNIN_AS ? { name: DEV_SIGNIN_AS, email: "" } : null;

if (devUser) console.warn(`Sign-in: DEVELOPMENT ONLY, everyone is signed in as "${devUser.name}".`);
else if (!signInConfigured) console.warn(`Sign-in is not set up, so the hub is closed. Missing: ${missing.join(", ")}. See .env.example.`);

const msal = signInConfigured
  ? new ConfidentialClientApplication({
      auth: {
        clientId: ENTRA_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${ENTRA_TENANT_ID}`,
        clientSecret: ENTRA_CLIENT_SECRET,
      },
    })
  : null;
const pkce = new CryptoProvider();
const SCOPES = ["User.Read"];

// How long the hub remembers someone (agreed with Ian, October 2026). Shorter is more secure:
// a leaver whose Microsoft account is disabled keeps hub access on a device already signed in
// until their sign-in here runs out.
const DAY = 24 * 60 * 60 * 1000;
const STAY_SIGNED_IN = 7 * DAY; // renewed on every visit
const SIGN_IN_AGAIN_AFTER = 30 * DAY; // however often they visit

// The signed-in person is kept in a cookie that is signed with SESSION_SECRET (so it can't be
// forged or edited), hidden from page scripts, and only sent over HTTPS on the live site.
export const session = cookieSession({
  name: "sm_hub_session",
  keys: [SESSION_SECRET || crypto.randomBytes(32).toString("hex")],
  maxAge: STAY_SIGNED_IN,
  httpOnly: true,
  sameSite: "lax",
  secure: baseUrl.startsWith("https://"),
});

// Only allow returning to a page on this site after signing in.
function safeReturnTo(value) {
  const path = typeof value === "string" ? value : "/";
  return path.startsWith("/") && !path.startsWith("//") && !path.startsWith("/\\") && !path.startsWith("/auth") ? path : "/";
}

export const auth = Router();

auth.get("/signin", async (req, res) => {
  const returnTo = safeReturnTo(req.query.returnTo);
  if (devUser) {
    req.session = { user: devUser, signedInAt: Date.now() };
    return res.redirect(returnTo);
  }
  if (!signInConfigured) return notSetUp(res);

  // PKCE and state protect the round trip to Microsoft from being hijacked or replayed.
  const { verifier, challenge } = await pkce.generatePkceCodes();
  const state = pkce.createNewGuid();
  req.session = { signin: { verifier, state, returnTo } };
  const url = await msal.getAuthCodeUrl({
    scopes: SCOPES,
    redirectUri,
    codeChallenge: challenge,
    codeChallengeMethod: "S256",
    state,
  });
  res.redirect(url);
});

auth.get("/callback", async (req, res) => {
  if (!signInConfigured) return notSetUp(res);
  const pending = req.session?.signin;

  if (req.query.error) {
    console.warn("Sign-in refused by Microsoft:", req.query.error, req.query.error_description);
    return res.status(401).send(page("Sign-in didn't complete", "Microsoft didn't sign you in. You may have cancelled, or your account may not have access to the Training Hub.", "Try again"));
  }
  if (!pending || !req.query.code || req.query.state !== pending.state) {
    return res.status(400).send(page("Sign-in timed out", "Your sign-in took too long or was started in another tab.", "Try again"));
  }

  const result = await msal.acquireTokenByCode({
    code: String(req.query.code),
    scopes: SCOPES,
    redirectUri,
    codeVerifier: pending.verifier,
  });
  const claims = result.idTokenClaims ?? {};

  // Belt and braces: the app registration only accepts our organisation, but check anyway.
  if (claims.tid !== ENTRA_TENANT_ID) {
    console.warn("Sign-in from another organisation refused:", claims.tid);
    return res.status(403).send(page("This account can't be used", "Please sign in with your Stott and May work account.", "Sign in with a different account"));
  }

  // A fresh session, holding only what the hub needs to show who is signed in.
  req.session = {
    user: { name: claims.name || claims.preferred_username, email: claims.preferred_username || "", id: claims.oid },
    signedInAt: Date.now(),
  };
  res.redirect(pending.returnTo);
});

auth.get("/signout", (req, res) => {
  req.session = null;
  if (!signInConfigured) return res.redirect("/auth/signed-out");
  // Also sign out of Microsoft, then come back to the "signed out" page.
  res.redirect(`https://login.microsoftonline.com/${ENTRA_TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(signedOutUrl)}`);
});

auth.get("/signed-out", (req, res) => {
  res.send(page("You've signed out", "You've signed out of the Stott and May Training Hub.", "Sign in again"));
});

// If anything goes wrong talking to Microsoft, log it and show a plain message.
auth.use((err, req, res, next) => {
  console.error("Sign-in error:", err);
  res.status(500).send(page("Sign-in didn't work", "Something went wrong while signing you in. Please try again in a moment.", "Try again"));
});

// Everything after this needs a signed-in person.
export function requireSignIn(req, res, next) {
  const user = req.session?.user;
  const signedInAt = req.session?.signedInAt ?? 0;
  if (user && Date.now() - signedInAt < SIGN_IN_AGAIN_AFTER) {
    req.user = user;
    // Renew the 7 days. Changing the session makes the browser keep the cookie for another 7 days;
    // doing it once an hour is plenty and keeps the cookie quiet the rest of the time.
    req.session.renewed = Math.floor(Date.now() / (60 * 60 * 1000));
    return next();
  }
  if (user) req.session = null; // past the 30 days: sign in again
  if (req.path.startsWith("/api/")) return res.status(401).json({ error: "Please sign in." });
  if (!signInConfigured && !devUser) return notSetUp(res);
  res.redirect(`/auth/signin?returnTo=${encodeURIComponent(req.originalUrl)}`);
}

function notSetUp(res) {
  res.status(503).send(page("Sign-in isn't set up yet", "The Training Hub opens once Microsoft sign-in has been set up. Please try again later."));
}

// A plain page for sign-in messages. Kept simple: these show before the hub itself loads.
function page(title, message, action) {
  return `<!doctype html>
<html lang="en-GB">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} · Stott and May Training Hub</title>
<style>body{font-family:system-ui,sans-serif;max-width:32rem;margin:15vh auto;padding:0 1rem;line-height:1.6}a{font-weight:700}</style></head>
<body><h1>${title}</h1><p>${message}</p>${action ? `<p><a href="/auth/signin">${action}</a></p>` : ""}</body>
</html>`;
}
