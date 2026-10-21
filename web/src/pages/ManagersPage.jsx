import { useEffect } from "react";
import Eyebrow from "../components/Eyebrow.jsx";
import LoadState from "../components/LoadState.jsx";
import ModuleCard from "../components/ModuleCard.jsx";
import PageHero from "../components/PageHero.jsx";
import LibraryCard from "../components/library/LibraryCard.jsx";
import { Icon } from "../components/icons.jsx";
import { useApi } from "../lib/api.js";
import { groupModules } from "../lib/groupModules.js";
import { useProgress } from "../lib/progress.jsx";
import { placeholderPhotos } from "../lib/placeholderPhotos.js";
import "./ManagersPage.css";

// The Managers page: modules and downloads marked "Managers" in the Studio, kept apart from
// the consultants' training.
export default function ManagersPage() {
  const { data, error } = useApi("/managers");
  const { countDone } = useProgress();
  useEffect(() => { document.title = "Managers · Stott and May Training Hub"; }, []);
  if (error || !data) return <LoadState error={error} />;

  const groups = groupModules(data.modules ?? []);
  const files = data.library ?? [];
  return (
    <>
      <PageHero eyebrow="For managers" title={data.page?.title ?? "For managers"} intro={data.page?.intro} photo={placeholderPhotos.moduleHeroes[1]}>
        {(data.modules.length > 0 || files.length > 0) && (
          <p className="managers-count">
            <Icon name="briefcase" size={18} />
            {[
              data.modules.length && `${data.modules.length} ${data.modules.length === 1 ? "module" : "modules"}`,
              files.length && `${files.length} ${files.length === 1 ? "file" : "files"} to download`,
            ].filter(Boolean).join(" · ")}
          </p>
        )}
      </PageHero>

      <div className="container managers-stack">
        {!groups.length && !files.length && (
          <p className="managers-empty">Nothing here yet. Manager modules and files appear once they're published in the Studio.</p>
        )}
        {groups.map((g, i) => (
          <section key={g.id} aria-labelledby={`managers-modules-${i}`}>
            <Eyebrow>{g.modules.length} {g.modules.length === 1 ? "module" : "modules"}</Eyebrow>
            <h2 id={`managers-modules-${i}`} className="managers-title">{groups.length === 1 && !g.description ? "Modules" : g.title}</h2>
            {g.description && <p className="managers-lead">{g.description}</p>}
            <ul className="managers-grid">
              {g.modules.map((m) => <li key={m._id}><ModuleCard module={m} done={countDone(m.slug, m.sectionKeys)} /></li>)}
            </ul>
          </section>
        ))}
        {files.length > 0 && (
          <section aria-labelledby="managers-files">
            <Eyebrow>Downloads</Eyebrow>
            <h2 id="managers-files" className="managers-title">Training decks and files</h2>
            <ul className="managers-grid managers-grid--files">
              {files.map((item) => <li key={item._id}><LibraryCard item={item} /></li>)}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
