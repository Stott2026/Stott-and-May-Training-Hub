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
import { hubName, fullHubName } from "./sanity.js";
import { HOUSE_URL, houseReady, checkHousePass } from "./house.js";

const { ENTRA_CLIENT_ID, ENTRA_TENANT_ID, ENTRA_CLIENT_SECRET, SESSION_SECRET, DEV_SIGNIN_AS, NODE_ENV } = process.env;

// The address people use to reach the hub. Microsoft sends people back to <BASE_URL>/auth/callback,
// so it must match a redirect URI registered by IT exactly.
const baseUrl = (process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`).replace(/\/+$/, "");
const redirectUri = `${baseUrl}/auth/callback`;
const signedOutUrl = `${baseUrl}/auth/signed-out`;

const REQUIRED = { ENTRA_CLIENT_ID, ENTRA_TENANT_ID, ENTRA_CLIENT_SECRET, SESSION_SECRET };
const missing = Object.keys(REQUIRED).filter((name) => !REQUIRED[name]);
export const signInConfigured = missing.length === 0;

// Signing in through the House (agreed with Ian, November 2026): people sign in once at the House
// (stott2026/the-house) and the Study's door brings a pass (server/house.js). On whenever HOUSE_URL
// and SESSION_SECRET are set; it takes over from Microsoft sign-in, which is no longer planned.
export const houseSignIn = houseReady && Boolean(SESSION_SECRET);

// Before the hub opens to everyone (agreed with Ian, November 2026): while EARLY_ACCESS lists email
// addresses (comma-separated, a Railway variable), only those people can use the hub; everyone else
// signed in sees "coming soon". Remove the variable to open the hub to everyone.
const earlyAccess = new Set((process.env.EARLY_ACCESS || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean));
// While the rest of the hub is early access only, the Games Room is open to everyone signed in
// (agreed with Ian, November 2026): its pages, its own requests, and what the page needs to load.
// Everyone else sees just the Games Room ("games only"); the rest stays coming soon.
const GAMES_FOR_ALL = [/^\/games(\/|$)/, /^\/api\/games(\/|$)/, /^\/api\/(site|me)$/, /^\/assets\//, /^\/(placeholders|concepts)\//, /^\/[^/]+\.(svg|png|ico|webp|jpg|txt|webmanifest)$/];
const gamesForAll = (path) => GAMES_FOR_ALL.some((rule) => rule.test(path));

if (earlyAccess.size) console.warn(`Sign-in: early access only (${earlyAccess.size} ${earlyAccess.size === 1 ? "person" : "people"}); everyone else sees "coming soon".`);

// For local development before IT's details arrive: DEV_SIGNIN_AS="Your Name" signs you in as that
// name without Microsoft. Only works when NODE_ENV is exactly "development" and Microsoft sign-in
// isn't set up, so it can never switch on in production.
const devUser = !signInConfigured && !houseSignIn && NODE_ENV === "development" && DEV_SIGNIN_AS ? { name: DEV_SIGNIN_AS, email: "" } : null;

if (houseSignIn) console.warn(`Sign-in: through the House (${HOUSE_URL}).`);
else if (devUser) console.warn(`Sign-in: DEVELOPMENT ONLY, everyone is signed in as "${devUser.name}".`);
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

// Where to sign in through the House: it sends you back here (returnTo) with a pass.
// The hub's own address, from the visit itself (Railway says it was https), so a stale BASE_URL can't break it.
const ownOrigin = (req) => `${req.protocol}://${req.get("host")}`;
const houseSignInUrl = (req, returnTo) => `${HOUSE_URL}/pass?for=${encodeURIComponent(ownOrigin(req) + returnTo)}`;
const SIGN_IN_AGAIN_AFTER_HOUSE = 7 * DAY; // the same as the House

// A House pass in the address: sign in, then tidy the address. Runs before requireSignIn.
export async function acceptHousePass(req, res, next) {
  if (!houseSignIn || req.method !== "GET" || !req.query.house_pass) return next();
  const clean = new URL(req.originalUrl, ownOrigin(req));
  clean.searchParams.delete("house_pass");
  const returnTo = safeReturnTo(clean.pathname + clean.search);
  const person = await checkHousePass(req.query.house_pass, ownOrigin(req));
  if (!person) {
    // Run out or used already: offer to try again, rather than bouncing back to the House.
    return res.status(401).send(page("We couldn't sign you in", "The link from the House had run out or was already used.").replace("</body>", `<p><a href="${houseSignInUrl(req, returnTo).replace(/"/g, "&quot;")}">Try again</a></p></body>`));
  }
  const name = person.name || person.email.split("@")[0].split(/[._-]+/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
  req.session = { user: { name, email: person.email }, signedInAt: Date.now(), via: "house" };
  console.log(JSON.stringify({ event: "house_sign_in", domain: person.email.split("@")[1] }));
  res.redirect(returnTo);
}

auth.get("/signin", async (req, res) => {
  const returnTo = safeReturnTo(req.query.returnTo);
  if (houseSignIn) return res.redirect(houseSignInUrl(req, returnTo));
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
    return res.status(401).send(page("Sign-in didn't complete", `Microsoft didn't sign you in. You may have cancelled, or your account may not have access to the ${hubName()}.`, "Try again"));
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
  if (houseSignIn) return res.redirect(`${HOUSE_URL}/?hallway`); // back to the House's hallway
  if (!signInConfigured) return res.redirect("/auth/signed-out");
  // Also sign out of Microsoft, then come back to the "signed out" page.
  res.redirect(`https://login.microsoftonline.com/${ENTRA_TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(signedOutUrl)}`);
});

auth.get("/signed-out", (req, res) => {
  res.send(page("You've signed out", `You've signed out of the ${fullHubName()}.`, "Sign in again"));
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
  const limit = req.session?.via === "house" ? SIGN_IN_AGAIN_AFTER_HOUSE : SIGN_IN_AGAIN_AFTER;
  if (user && Date.now() - signedInAt < limit) {
    if (earlyAccess.size && !devUser && !earlyAccess.has(String(user.email || "").toLowerCase())) {
      if (gamesForAll(req.path)) {
        req.gamesOnly = true;
      } else {
        if (req.path.startsWith("/api/")) return res.status(403).json({ error: "The hub is coming soon." });
        const house = houseSignIn ? `<p><a href="${HOUSE_URL}/?hallway">Back to the House</a></p>` : "";
        const games = `<p><a href="/games">Play in the Games Room</a></p>`;
        return res.status(403).send(page("Coming soon", `The ${hubName()} is being got ready and opens soon. Thanks for your patience. The Games Room is open now.`).replace("</body>", `${games}${house}</body>`));
      }
    }
    req.user = user;
    // Renew the 7 days. Changing the session makes the browser keep the cookie for another 7 days;
    // doing it once an hour is plenty and keeps the cookie quiet the rest of the time.
    req.session.renewed = Math.floor(Date.now() / (60 * 60 * 1000));
    return next();
  }
  if (user) req.session = null; // past the 30 days: sign in again
  // Library downloads are plain links, so they go to the sign-in page (and back to the Library)
  // rather than getting the "please sign in" message the hub's own requests get.
  const download = /^\/api\/library\/[^/]+\/download$/.test(req.path);
  if (req.path.startsWith("/api/") && !download) return res.status(401).json({ error: "Please sign in." });
  if (!signInConfigured && !devUser && !houseSignIn) return notSetUp(res);
  res.redirect(`/auth/signin?returnTo=${encodeURIComponent(download ? "/library" : req.originalUrl)}`);
}

function notSetUp(res) {
  res.status(503).send(page("Sign-in isn't set up yet", `The ${hubName()} isn't open yet. Please try again later.`));
}

// A plain page for sign-in messages. Kept simple: these show before the hub itself loads.
function page(title, message, action) {
  return `<!doctype html>
<html lang="en-GB">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} · ${fullHubName()}</title>
<style>body{font-family:system-ui,sans-serif;max-width:32rem;margin:15vh auto;padding:0 1rem;line-height:1.6}a{font-weight:700}</style></head>
<body><h1>${title}</h1><p>${message}</p>${action ? `<p><a href="/auth/signin">${action}</a></p>` : ""}</body>
</html>`;
}
