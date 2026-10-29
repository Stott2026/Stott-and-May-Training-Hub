import { Icon } from "../icons.jsx";
import { useSite } from "../../lib/site.jsx";

// "Look here" cards: pointers to useful material elsewhere, usually the Marketing Hub.
// A card without its own address links to the first quick link in Site settings.
export default function LookHere({ items = [] }) {
  const fallback = useSite().quickLinks?.[0];
  const links = items.map((item) => ({ ...item, href: item.url || fallback?.url, place: item.url ? null : fallback?.label })).filter((l) => l.href);
  if (!links.length) return null;
  return (
    <section className="look-here content-block" aria-labelledby="look-here-title">
      <div className="look-here__head">
        <span className="look-here__icon"><Icon name="folder-open" size={22} /></span>
        <div>
          <h3 id="look-here-title" className="look-here__title">Look here</h3>
          <p className="look-here__lead">Useful material to use alongside this section.</p>
        </div>
      </div>
      <ul className="look-here__list">
        {links.map((l, i) => (
          <li key={l._key ?? i}>
            <a className="look-here__link" href={l.href} target="_blank" rel="noopener noreferrer">
              <span className="look-here__text">
                <span className="look-here__name">{l.title}</span>
                {l.note && <span className="look-here__note">{l.note}</span>}
                {(l.where || l.place) && (
                  <span className="look-here__where">{[l.place, l.where].filter(Boolean).join(" · ")}</span>
                )}
              </span>
              <Icon name="external-link" size={18} className="look-here__go" />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
