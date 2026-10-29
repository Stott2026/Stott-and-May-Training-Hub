import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import Card from "../components/Card.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
import IconBadge from "../components/IconBadge.jsx";
import LoadState from "../components/LoadState.jsx";
import PageHero from "../components/PageHero.jsx";
import SearchField from "../components/SearchField.jsx";
import { Icon } from "../components/icons.jsx";
import { useApi } from "../lib/api.js";
import { placeholderPhotos } from "../lib/placeholderPhotos.js";
import "./LibraryPage.css";
import "./FormsPage.css";

const ACCENTS = ["brand", "sky", "lime"];

// Documents & Forms: fillable forms from Sanity, grouped, with a filter and a search box.
// ?group=… and ?q=… live in the page address, so Back keeps them.
export default function FormsPage() {
  const { data, error } = useApi("/forms");
  const [params, setParams] = useSearchParams();
  useEffect(() => { document.title = "Documents & Forms · Stott and May Training Hub"; }, []);
  if (error || !data) return <LoadState error={error} />;

  const items = data.items ?? [];
  const groups = [...new Set(items.map((i) => i.group))];
  const group = groups.includes(params.get("group")) ? params.get("group") : null;
  const q = (params.get("q") ?? "").trim().toLowerCase();
  const update = (changes) => {
    const next = Object.fromEntries([...params.entries(), ...Object.entries(changes)].filter(([, v]) => v));
    setParams(next, { replace: true });
  };
  const shown = items.filter((i) => (!group || i.group === group) && (!q || `${i.title} ${i.summary} ${i.group}`.toLowerCase().includes(q)));
  const shownGroups = groups.filter((g) => shown.some((i) => i.group === g));

  return (
    <>
      <PageHero eyebrow="Stott and May" title={data.page?.title ?? "Documents & Forms"} intro={data.page?.intro} photo={placeholderPhotos.moduleHeroes[3]}>
        <div className="forms-search">
          <SearchField value={params.get("q") ?? ""} onChange={(v) => update({ q: v })} label="Search forms" placeholder="Search forms, e.g. offer, reference, BD…" />
        </div>
      </PageHero>

      <div className="container forms-body">
        {groups.length > 1 && (
          <div className="library-filters" role="group" aria-label="Show">
            <button type="button" className="library-filter" aria-pressed={!group} onClick={() => update({ group: "" })}>
              <span>Everything</span><span className="library-filter__count">{items.length}</span>
            </button>
            {groups.map((g) => (
              <button key={g} type="button" className="library-filter" aria-pressed={group === g} onClick={() => update({ group: g })}>
                <span>{g}</span><span className="library-filter__count">{items.filter((i) => i.group === g).length}</span>
              </button>
            ))}
          </div>
        )}
        {!items.length && <p className="library-empty">No forms yet. Forms appear here once they're published in the Studio.</p>}
        {items.length > 0 && !shown.length && <p className="library-empty" aria-live="polite">No forms match that. Try a shorter word.</p>}
        {shownGroups.map((g) => (
          <section key={g} className="forms-group" aria-labelledby={`forms-${g}`}>
            <h2 id={`forms-${g}`} className="forms-group__title">{g}</h2>
            <ul className="forms-grid">
              {shown.filter((i) => i.group === g).map((f) => {
                const accent = ACCENTS[groups.indexOf(g) % ACCENTS.length];
                return (
                  <li key={f._id}>
                    <Card as={Link} to={`/documents/${f.slug}`} interactive accent={accent} className="form-card">
                      <IconBadge name={f.icon} accent={accent} />
                      <Eyebrow>{f.group}</Eyebrow>
                      <h3 className="form-card__title">{f.title}</h3>
                      <p className="form-card__summary">{f.summary}</p>
                      <span className="form-card__go">Open form <Icon name="arrow-right" size={14} /></span>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
