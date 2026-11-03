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
import StartPage from "./pages/StartPage.jsx";
import AchievementsPage from "./pages/AchievementsPage.jsx";
import TechPage from "./pages/TechPage.jsx";
import ToolPage from "./pages/ToolPage.jsx";
import CompliancePage from "./pages/CompliancePage.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import { ComplianceProvider } from "./lib/compliance.jsx";
import { ProgressProvider } from "./lib/progress.jsx";
import { NavAreaProvider, useNavArea } from "./lib/navArea.jsx";
import { SiteProvider, useHubName, useSite } from "./lib/site.jsx";
import { AchievementsProvider, useAchievements } from "./lib/achievements.jsx";
import Celebration from "./components/Celebration.jsx";
import AskMay from "./components/AskMay.jsx";
import { showMayConcept } from "./components/AskMayConcept.jsx";
import { MayProvider } from "./lib/may.jsx";
import { useApi } from "./lib/api.js";

const NAV = [
  { id: "training", label: "Training", icon: "graduation-cap", href: "/" },
  { id: "start", label: "New to the desk", icon: "rocket", href: "/start" },
  { id: "tech", label: "Technology", icon: "laptop", href: "/tech" },
  { id: "library", label: "Library", icon: "library", href: "/library" },
  { id: "managers", label: "Managers", icon: "briefcase", href: "/managers" },
  { id: "documents", label: "Documents & Forms", icon: "file-text", href: "/documents" },
  { id: "compliance", label: "Compliance", icon: "shield-check", href: "/compliance" },
];

// Back to the top of the page whenever the page (not just the search words) changes.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const { fullName } = useHubName();
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  // The home page and quiz set no title of their own.
  useEffect(() => {
    if (pathname === "/") document.title = fullName;
    if (pathname === "/quiz") document.title = `Quiz · ${fullName}`;
  }, [pathname, fullName]);
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
  const { name } = useHubName();
  const ach = useAchievements();
  // The level and points chip in the top bar, once badges and levels are switched on.
  const level = ach.enabled ? { title: ach.level.title, points: ach.points } : null;
  const current = pathname.startsWith("/tech") ? "tech" : pathname.startsWith("/start") ? "start" : pathname.startsWith("/achievements") ? "achievements" : pathname.startsWith("/library") ? "library" : pathname.startsWith("/managers") || area === "managers" ? "managers" : pathname.startsWith("/documents") ? "documents" : pathname.startsWith("/compliance") ? "compliance" : "training";
  return <AppShell productName={name} navItems={NAV} quickLinks={quickLinks ?? []} level={level} current={current} user={user}>{children}</AppShell>;
}

// The real Ask May, when it's switched on (the server has an Anthropic API key). The preview
// build has no server, so it shows the concept instead.
function LiveMay() {
  const { may } = useSite();
  return may && !showMayConcept ? <AskMay /> : null;
}

export default function App() {
  const { data: me } = useApi("/me");
  const user = me && { name: me.name, initials: initialsOf(me.name), canSignOut: !me.preview };
  return (
    <Router>
      <SiteProvider>
      <ProgressProvider>
      <ComplianceProvider>
      <AchievementsProvider>
        <MayProvider>
        <NavAreaProvider>
          <ScrollToTop />
          <Shell user={user}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/modules/:slug" element={<ModulePage />} />
              <Route path="/start" element={<StartPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/tech" element={<TechPage />} />
              <Route path="/tech/:slug" element={<ToolPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/managers" element={<ManagersPage />} />
              <Route path="/documents" element={<FormsPage />} />
              <Route path="/documents/:slug" element={<FormPage />} />
              <Route path="/compliance" element={<CompliancePage />} />
              <Route path="/compliance/:slug" element={<CoursePage />} />
              <Route path="/compliance/:slug/:step" element={<CoursePage />} />
              <Route path="*" element={<LoadState error={{ status: 404 }} />} />
            </Routes>
          </Shell>
          <Celebration />
          <LiveMay />
        </NavAreaProvider>
        </MayProvider>
      </AchievementsProvider>
      </ComplianceProvider>
      </ProgressProvider>
      </SiteProvider>
    </Router>
  );
}
