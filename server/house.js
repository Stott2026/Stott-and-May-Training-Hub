/* ============================================================
   Signing in through the House (agreed with Ian, November 2026).
   The House (stott2026/the-house) is the one place Stott and May
   people sign in. Going through the Study's door arrives
   here with ?house_pass=… : a pass signed by the House, naming the
   person and this tool's address, valid 60 seconds, usable once.
   We check it with the House's public key (<HOUSE_URL>/auth/pass-key;
   it can only check passes, never make them) and swap it for this
   tool's usual sign-in. The same check is in CV Intelligence
   (lib/house.js), the Brief Generator, the Terms Reviewer and
   Client Radar.
   ============================================================ */
import crypto from "crypto";

export const HOUSE_URL = (process.env.HOUSE_URL || "").trim().replace(/\/+$/, "");
export const houseReady = /^https?:\/\//.test(HOUSE_URL);

let houseKey = null;
let keyFetchedAt = 0;
async function getHouseKey(force = false) {
  if (houseKey && !force) return houseKey;
  if (Date.now() - keyFetchedAt < 30 * 1000) return houseKey; // at most twice a minute
  keyFetchedAt = Date.now();
  try {
    const res = await fetch(`${HOUSE_URL}/auth/pass-key`, { signal: AbortSignal.timeout(5000) });
    if (res.ok) houseKey = crypto.createPublicKey(await res.text());
  } catch (err) {
    console.error(`[house] can't fetch the House's key from ${HOUSE_URL}: ${err.message}`);
  }
  return houseKey;
}

const usedPasses = new Map(); // pass id → expiry, so each pass works once
setInterval(() => { const t = Date.now(); for (const [id, exp] of usedPasses) if (exp < t) usedPasses.delete(id); }, 60 * 1000).unref?.();

// Returns { email, name } for a good pass made for this tool (myOrigin), otherwise null.
export async function checkHousePass(pass, myOrigin) {
  if (!houseReady) return null;
  const [payload, signature] = String(pass || "").split(".");
  if (!payload || !signature) return null;
  const valid = (key) => Boolean(key) && crypto.verify(null, Buffer.from(payload), key, Buffer.from(signature, "base64url"));
  // If it doesn't check out, the House may have a new key: fetch it once more.
  if (!valid(await getHouseKey()) && !valid(await getHouseKey(true))) return null;
  let data;
  try { data = JSON.parse(Buffer.from(payload, "base64url").toString()); } catch { return null; }
  const now = Math.floor(Date.now() / 1000);
  if (data.v !== 1 || data.aud !== myOrigin || !data.sub || !data.exp || data.exp < now || data.iat > now + 30) return null;
  if (usedPasses.has(data.jti)) return null;
  usedPasses.set(data.jti, data.exp * 1000 + 60 * 1000);
  return { email: String(data.sub).toLowerCase(), name: String(data.name || "") };
}
