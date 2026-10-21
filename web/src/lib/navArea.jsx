import { createContext, useContext, useEffect, useState } from "react";

// Lets a page say which top tab it belongs to when the address alone can't tell,
// e.g. a module page for a manager module lights up the Managers tab.
const NavAreaContext = createContext({ area: null, setArea: () => {} });

export function NavAreaProvider({ children }) {
  const [area, setArea] = useState(null);
  return <NavAreaContext.Provider value={{ area, setArea }}>{children}</NavAreaContext.Provider>;
}

export const useNavArea = () => useContext(NavAreaContext).area;

// Call from a page: useSetNavArea("managers"). Cleared again when the page closes.
export function useSetNavArea(area) {
  const { setArea } = useContext(NavAreaContext);
  useEffect(() => {
    setArea(area);
    return () => setArea(null);
  }, [area, setArea]);
}
