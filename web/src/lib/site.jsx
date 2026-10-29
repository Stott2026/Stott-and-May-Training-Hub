import { createContext, useContext } from "react";
import { useApi } from "./api.js";

// Hub-wide settings from Sanity (Site settings), such as the quick links in the top bar.
const SiteContext = createContext({});

export function SiteProvider({ children }) {
  const { data } = useApi("/site");
  return <SiteContext.Provider value={data ?? {}}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
