import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Icon } from "../components/icons.jsx";

// A short message that floats up from the bottom of the screen and fades, such as "+10 points"
// when a section is completed. Read out to screen readers too. Styles in motion.css (.toast).
const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);
  const show = useCallback((text, icon = "star") => {
    clearTimeout(timer.current);
    setToast({ text, icon, id: Date.now() });
    timer.current = setTimeout(() => setToast(null), 1900);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="visually-hidden" role="status" aria-live="polite">{toast?.text}</div>
      {toast && <div key={toast.id} className="toast" aria-hidden="true"><Icon name={toast.icon} size={18} /> {toast.text}</div>}
    </ToastContext.Provider>
  );
}

// const toast = useToast(); toast("+10 points");
export const useToast = () => useContext(ToastContext);
