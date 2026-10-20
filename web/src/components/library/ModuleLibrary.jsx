import { Link } from "react-router";
import IconBadge from "../IconBadge.jsx";
import { Icon } from "../icons.jsx";
import { canDownload, downloadUrl, fileDetails, kindOf } from "../../lib/library.js";
import "./ModuleLibrary.css";

// Beside a module's sections: its files from the Library, such as the classroom deck.
export default function ModuleLibrary({ items = [], accent = "brand" }) {
  if (!items.length) return null;
  return (
    <section className="module-library" aria-labelledby="module-library-title">
      <h2 id="module-library-title" className="module-library__heading">From the Library</h2>
      <ul className="module-library__list">
        {items.map((item) => {
          const kind = kindOf(item.kind);
          const details = fileDetails(item.file);
          return (
            <li key={item._id} className="module-library__item">
              <IconBadge name={kind.icon} size="sm" accent={accent} />
              <div>
                <p className="module-library__title">{item.title}</p>
                <p className="module-library__meta">{[kind.label, details].filter(Boolean).join(" · ")}</p>
                {canDownload ? (
                  <a className="module-library__download" href={downloadUrl(item)} download>
                    <Icon name="download" size={16} /> Download<span className="visually-hidden"> {item.title}</span>
                  </a>
                ) : (
                  <span className="module-library__meta">Downloads work in the live hub</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <Link to="/library" className="module-library__all">Browse the Library <Icon name="arrow-right" size={14} /></Link>
    </section>
  );
}
