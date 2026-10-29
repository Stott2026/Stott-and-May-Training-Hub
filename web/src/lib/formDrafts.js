import { useCallback, useEffect, useState } from "react";

// What someone types into a form is kept in their own browser only (localStorage), never sent
// to the hub's server: until the data policy is confirmed, no candidate data leaves the device.
const storageKey = (slug) => `sm-hub-form:${slug}`;

function read(slug) {
  try {
    return JSON.parse(window.localStorage.getItem(storageKey(slug)) ?? "{}");
  } catch {
    return {};
  }
}

export function useFormDraft(slug) {
  const [values, setValues] = useState(() => read(slug));
  const [savedAt, setSavedAt] = useState(null);
  useEffect(() => { setValues(read(slug)); }, [slug]);

  const set = useCallback((key, value) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      try {
        window.localStorage.setItem(storageKey(slug), JSON.stringify(next));
        setSavedAt(new Date());
      } catch {
        // Private windows or blocked storage: the form still works, it just isn't kept.
      }
      return next;
    });
  }, [slug]);

  const clear = useCallback(() => {
    try { window.localStorage.removeItem(storageKey(slug)); } catch { /* nothing kept */ }
    setValues({});
    setSavedAt(null);
  }, [slug]);

  return { values, set, clear, savedAt, hasAnything: Object.values(values).some((v) => v !== "" && v !== false && v != null) };
}
