import Logo from "./Logo.jsx";
import Avatar from "./Avatar.jsx";
import { Icon } from "./icons.jsx";
import "./AppShell.css";

// The page frame: skip link, top navigation and the main content area.
// navItems: [{ id, label, icon, href }]. user: { name } once sign-in is added in step 6.
export default function AppShell({ navItems = [], current, user, children }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <header className="topnav">
        <div className="container topnav__inner">
          <a href="/" className="topnav__brand">
            <Logo size={36} />
            <span className="topnav__product">Training Hub</span>
          </a>
          <nav aria-label="Main" className="topnav__nav">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="topnav__link" aria-current={current === item.id ? "page" : undefined}>
                    <Icon name={item.icon} size={18} />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {user && (
            <div className="topnav__user">
              <span className="topnav__user-name">{user.name}</span>
              <Avatar size={36} initials={user.initials} />
            </div>
          )}
        </div>
      </header>
      <main id="main" className="app-main">{children}</main>
    </>
  );
}
