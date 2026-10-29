import { Link } from "react-router";
import Logo from "./Logo.jsx";
import Avatar from "./Avatar.jsx";
import { Icon } from "./icons.jsx";
import "./AppShell.css";

// The page frame: skip link, top navigation and the main content area.
// navItems: [{ id, label, icon, href }]. user: { name, initials, canSignOut } for the signed-in person.
// quickLinks: [{ label, url }] from Site settings, always shown as buttons that open in a new tab.
export default function AppShell({ navItems = [], quickLinks = [], current, user, children }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <header className="topnav">
        <div className="container topnav__inner">
          <Link to="/" className="topnav__brand">
            <Logo size={36} />
            <span className="topnav__product">Training Hub</span>
          </Link>
          <nav aria-label="Main" className="topnav__nav">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link to={item.href} className="topnav__link" aria-current={current === item.id ? "page" : undefined}>
                    <Icon name={item.icon} size={18} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {quickLinks.map((l) => (
            <a key={l._key ?? l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="topnav__quick" aria-label={`${l.label} (opens in a new tab)`}>
              <Icon name="folder-open" size={18} />
              <span>{l.label}</span>
              <Icon name="external-link" size={14} className="topnav__quick-out" />
            </a>
          ))}
          {user && (
            <div className="topnav__user">
              <span className="topnav__user-name">{user.name}</span>
              <Avatar size={36} initials={user.initials} />
              {/* A plain link, not an in-app one: signing out goes through the server and Microsoft. */}
              {user.canSignOut && <a href="/auth/signout" className="topnav__signout">Sign out</a>}
            </div>
          )}
        </div>
      </header>
      <main id="main" className="app-main">{children}</main>
    </>
  );
}
