import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// Ask May: where the learner is (so May knows which section or tool they mean) and whether the
// panel is open. Pages say where the learner is with useMayPlace(); anything can open the panel.
const MayContext = createContext({ place: null, setPlace: () => {}, request: null, open: () => {}, close: () => {}, isOpen: false });

export function MayProvider({ children }) {
  const [place, setPlace] = useState(null);
  const [isOpen, setOpen] = useState(false);
  // An optional first message and mode, when May is opened from a button such as "Role-play this".
  const [request, setRequest] = useState(null);
  const open = useCallback((prompt, mode) => { setRequest(prompt ? { prompt, mode, at: Date.now() } : null); setOpen(true); }, []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ place, setPlace, isOpen, open, close, request }), [place, isOpen, open, close, request]);
  return <MayContext.Provider value={value}>{children}</MayContext.Provider>;
}

export const useMay = () => useContext(MayContext);

// Tells May where the learner is while a page is showing, e.g.
// useMayPlace({ type: "section", module: "client-control", section: key, label: "Client Control · The four-part sell-in", scenario: true })
export function useMayPlace(place) {
  const { setPlace } = useMay();
  const key = place ? JSON.stringify(place) : "";
  useEffect(() => {
    setPlace(key ? JSON.parse(key) : null);
    return () => setPlace(null);
  }, [key, setPlace]);
}
