import { useEffect, useState } from "react";
import AppShell from "./components/AppShell.jsx";
import HomePlaceholder from "./pages/HomePlaceholder.jsx";
import ModulePage from "./pages/ModulePage.jsx";
import { previewModule, previewNextModule } from "./previewModule.js";

const NAV = [
  { id: "training", label: "Training", icon: "graduation-cap", href: "/" },
  { id: "documents", label: "Documents & Forms", icon: "file-text", href: "/" },
];

// Step 5 replaces this simple page switch with proper page addresses (routing).
export default function App() {
  const [view, setView] = useState("home");
  const [completed, setCompleted] = useState({});
  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const toggle = (i) => setCompleted((c) => ({ ...c, [i]: !c[i] }));

  return (
    <AppShell navItems={NAV} current="training" user={{ name: "Signed-in user", initials: "SM" }}>
      {view === "module" ? (
        <ModulePage
          module={previewModule}
          nextModule={previewNextModule}
          completed={completed}
          onToggleComplete={toggle}
          onBack={() => setView("home")}
          onOpenModule={() => setView("home")}
        />
      ) : (
        <HomePlaceholder onOpenModule={() => setView("module")} />
      )}
    </AppShell>
  );
}
