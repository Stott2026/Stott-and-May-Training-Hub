import { createContext, useContext, useEffect } from "react";
import { useApi } from "./api.js";

// Hub-wide settings from Sanity (Site settings), such as the hub's name and the quick links in the top bar.
const SiteContext = createContext({});

export function SiteProvider({ children }) {
  const { data } = useApi("/site");
  return <SiteContext.Provider value={data ?? {}}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);

// The hub's name ("Training Hub" until it's set in Site settings), and the full name for titles and
// certificates: "Stott and May" goes in front unless the name already mentions Stott.
export const DEFAULT_HUB_NAME = "Training Hub";
export function useHubName() {
  const name = useSite().hubName?.trim() || DEFAULT_HUB_NAME;
  return { name, fullName: /stott/i.test(name) ? name : `Stott and May ${name}` };
}

// Sets the browser tab title: "Library · Stott and May Training Hub", or just the full name.
export function usePageTitle(title) {
  const { fullName } = useHubName();
  useEffect(() => {
    if (title === null) return; // still loading: leave the title as it is
    document.title = title ? `${title} · ${fullName}` : fullName;
  }, [title, fullName]);
}
