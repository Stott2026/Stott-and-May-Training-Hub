import AppShell from "./components/AppShell.jsx";
import HomePlaceholder from "./pages/HomePlaceholder.jsx";

const NAV = [
  { id: "training", label: "Training", icon: "graduation-cap", href: "/" },
  { id: "documents", label: "Documents & Forms", icon: "file-text", href: "/" },
];

export default function App() {
  return (
    <AppShell navItems={NAV} current="training" user={{ name: "Signed-in user", initials: "SM" }}>
      <HomePlaceholder />
    </AppShell>
  );
}
