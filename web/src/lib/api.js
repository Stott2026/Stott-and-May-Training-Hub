import { useEffect, useState } from "react";
import { searchModules } from "../../../server/content.js";

// In the preview build (npm run preview:build) there is no server: content comes from a
// snapshot taken at build time. In the real hub this is empty and everything goes to /api.
const snapshot = Object.values(import.meta.glob("../preview/snapshot.json", { eager: true, import: "default" }))[0];

function fromSnapshot(path) {
  const [route, query] = path.split("?");
  if (route === "/search") return searchModules(snapshot.searchable, new URLSearchParams(query).get("q"));
  if (route in snapshot.routes) return snapshot.routes[route];
  throw Object.assign(new Error("Not found"), { status: 404 });
}

async function load(path) {
  if (snapshot) return fromSnapshot(path);
  const res = await fetch(`/api${path}`);
  if (res.status === 401) {
    // Signed out or the sign-in ran out: sign in again and come back to this page.
    window.location.assign(`/auth/signin?returnTo=${encodeURIComponent(window.location.pathname + window.location.search)}`);
    return new Promise(() => {});
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(body.error || "Something went wrong."), { status: res.status });
  return body;
}

// Loads JSON from the hub's server. Returns { data, error, loading }.
// All content comes through /api: the browser never talks to Sanity directly.
export function useApi(path) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  useEffect(() => {
    if (!path) return;
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    load(path)
      .then((data) => !cancelled && setState({ data, error: null, loading: false }))
      .catch((error) => !cancelled && setState({ data: null, error, loading: false }));
    return () => { cancelled = true; };
  }, [path]);
  return state;
}
