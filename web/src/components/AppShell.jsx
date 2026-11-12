import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router";
import Logo from "./Logo.jsx";
import Avatar from "./Avatar.jsx";
import { Icon } from "./icons.jsx";
import "./AppShell.css";

// The page frame: skip link, top navigation and the main content area.
// navItems: [{ id, label, icon, href }]. user: { name, initials, canSignOut } for the signed-in person.
// quickLinks: [{ label, url }] from Site settings, always shown as buttons that open in a new tab.
// house: { url, label } from Site settings: a button back to the House's hallway, in the same tab.
// level: { title, points } for the chip that opens the achievements page (none until switched on).
export default function AppShell({ productName = "Training Hub", navItems = [], quickLinks = [], house, level, current, user, children }) {
  const houseHref = hallwayAddress(house?.url);
  const houseLabel = house?.label?.trim() || "The House";
  // The tabs show their names when they fit. If not, only the current tab keeps its name, and
  // if that still doesn't fit, every tab is an icon (names show on hover and are read out).
  const header = useRef(null);
  useLayoutEffect(() => {
    const el = header.current;
    const nav = el?.querySelector(".topnav__nav");
    if (!nav) return;
    const fit = () => {
      for (const mode of ["full", "compact", "icons"]) {
        el.dataset.fit = mode;
        if (nav.scrollWidth <= nav.clientWidth + 1) break;
      }
    };
    fit();
    document.fonts?.ready.then(fit);
    const watch = new ResizeObserver(fit);
    watch.observe(el);
    return () => watch.disconnect();
  }, [navItems, current, quickLinks.length, houseHref, level?.title, user?.name, productName]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <header className="topnav" ref={header}>
        <div className="container topnav__inner">
          <Link to="/" className="topnav__brand">
            <Logo size={36} />
            <span className="topnav__product">{productName}</span>
          </Link>
          <nav aria-label="Main" className="topnav__nav">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link to={item.href} className="topnav__link" aria-current={current === item.id ? "page" : undefined} title={item.label}>
                    <Icon name={item.icon} size={18} />
                    <span className="topnav__link-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="topnav__tools">
          {houseHref && (
            <a href={houseHref} className="topnav__quick topnav__house" aria-label={`Back to ${houseLabel}`} title={`Back to ${houseLabel}`}>
              <Icon name="house" size={18} />
              <span>{houseLabel}</span>
            </a>
          )}
          {quickLinks.map((l) => (
            <a key={l._key ?? l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="topnav__quick" aria-label={`${l.label} (opens in a new tab)`}>
              <Icon name="folder-open" size={18} />
              <span>{l.label}</span>
              <Icon name="external-link" size={14} className="topnav__quick-out" />
            </a>
          ))}
          {level && (
            <Link to="/achievements" className="topnav__level" aria-current={current === "achievements" ? "page" : undefined} aria-label={`Your achievements: ${level.title}, ${level.points} points`}>
              <Icon name="crown" size={16} />
              <span className="topnav__level-title">{level.title}</span>
              <span className="topnav__level-points">{level.points.toLocaleString("en-GB")}</span>
            </Link>
          )}
          {user && (
            <div className="topnav__user">
              <span className="topnav__user-name">{user.name}</span>
              <Avatar size={36} initials={user.initials} />
              {/* A plain link, not an in-app one: signing out goes through the server and Microsoft. */}
              {user.canSignOut && <a href="/auth/signout" className="topnav__signout">Sign out</a>}
            </div>
          )}
          </div>
        </div>
      </header>
      <main id="main" className="app-main">{children}</main>
    </>
  );
}

// The House's address with ?hallway on the end, so people go straight to the hallway rather than
// walking through the front door again. Nothing if the address is missing or not a web address.
function hallwayAddress(url) {
  if (!url) return null;
  try {
    const address = new URL(url);
    address.search = "hallway";
    return address.toString();
  } catch {
    return null;
  }
}
