import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import AppShell from "./components/AppShell.jsx";
import LoadState from "./components/LoadState.jsx";
import HomePage from "./pages/HomePage.jsx";
import ModulePage from "./pages/ModulePage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import { ProgressProvider } from "./lib/progress.jsx";

const NAV = [
  { id: "training", label: "Training", icon: "graduation-cap", href: "/" },
  // Phase 3: the Documents & Forms page.
  { id: "documents", label: "Documents & Forms", icon: "file-text", href: "/" },
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

export default function App() {
  return (
    <BrowserRouter>
      <ProgressProvider>
        <ScrollToTop />
        {/* Step 6 replaces this with the signed-in person's name. */}
        <AppShell navItems={NAV} current="training" user={{ name: "Signed-in user", initials: "SM" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/modules/:slug" element={<ModulePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="*" element={<LoadState error={{ status: 404 }} />} />
          </Routes>
        </AppShell>
      </ProgressProvider>
    </BrowserRouter>
  );
}
