import { useEffect, useState } from "react";

// Loads JSON from the hub's server. Returns { data, error, loading }.
// All content comes through /api: the browser never talks to Sanity directly.
export function useApi(path) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  useEffect(() => {
    if (!path) return;
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    fetch(`/api${path}`)
      .then(async (res) => {
        const body = await res.json().catch(() => ({}));
        if (!res.ok) throw Object.assign(new Error(body.error || "Something went wrong."), { status: res.status });
        return body;
      })
      .then((data) => !cancelled && setState({ data, error: null, loading: false }))
      .catch((error) => !cancelled && setState({ data: null, error, loading: false }));
    return () => { cancelled = true; };
  }, [path]);
  return state;
}
