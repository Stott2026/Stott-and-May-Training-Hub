import { useEffect } from "react";
import { BrowserRouter, HashRouter, Route, Routes, useLocation } from "react-router";
import AppShell from "./components/AppShell.jsx";
import LoadState from "./components/LoadState.jsx";
import HomePage from "./pages/HomePage.jsx";
import ModulePage from "./pages/ModulePage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import ManagersPage from "./pages/ManagersPage.jsx";
import FormsPage from "./pages/FormsPage.jsx";
import FormPage from "./pages/FormPage.jsx";
import { ProgressProvider } from "./lib/progress.jsx";
import { NavAreaProvider, useNavArea } from "./lib/navArea.jsx";
import { SiteProvider, useSite } from "./lib/site.jsx";
import { useApi } from "./lib/api.js";

const NAV = [
  { id: "training", label: "Training", icon: "graduation-cap", href: "/" },
  { id: "library", label: "Library", icon: "library", href: "/library" },
  { id: "managers", label: "Managers", icon: "briefcase", href: "/managers" },
  { id: "documents", label: "Documents & Forms", icon: "file-text", href: "/documents" },
];

// Back to the top of the page whenever the page (not just the search words) changes.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (pathname === "/") document.title = "Stott and May Training Hub";
    if (pathname === "/quiz") document.title = "Quiz · Stott and May Training Hub";
  }, [pathname]);
  return null;
}

// The preview build is a single page, so it keeps the page address after a # instead.
const Router = import.meta.env.MODE === "preview" ? HashRouter : BrowserRouter;

// "Ian Barker" → "IB"
const initialsOf = (name = "") => name.split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

// Which top tab is lit: Library or Managers for their pages (and manager modules), otherwise Training.
function Shell({ user, children }) {
  const { pathname } = useLocation();
  const area = useNavArea();
  const { quickLinks } = useSite();
  const current = pathname.startsWith("/library") ? "library" : pathname.startsWith("/managers") || area === "managers" ? "managers" : pathname.startsWith("/documents") ? "documents" : "training";
  return <AppShell navItems={NAV} quickLinks={quickLinks} current={current} user={user}>{children}</AppShell>;
}

export default function App() {
  const { data: me } = useApi("/me");
  const user = me && { name: me.name, initials: initialsOf(me.name), canSignOut: !me.preview };
  return (
    <Router>
      <SiteProvider>
      <ProgressProvider>
        <NavAreaProvider>
          <ScrollToTop />
          <Shell user={user}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/modules/:slug" element={<ModulePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/managers" element={<ManagersPage />} />
              <Route path="/documents" element={<FormsPage />} />
              <Route path="/documents/:slug" element={<FormPage />} />
              <Route path="*" element={<LoadState error={{ status: 404 }} />} />
            </Routes>
          </Shell>
        </NavAreaProvider>
      </ProgressProvider>
      </SiteProvider>
    </Router>
  );
}
