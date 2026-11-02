import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
import IconBadge from "../components/IconBadge.jsx";
import LoadState from "../components/LoadState.jsx";
import ModuleCard from "../components/ModuleCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import ProgressRing from "../components/ProgressRing.jsx";
import SearchField from "../components/SearchField.jsx";
import ShapeImage from "../components/ShapeImage.jsx";
import Wave from "../components/Wave.jsx";
import AskMayConcept, { showMayConcept } from "../components/AskMayConcept.jsx";
import { Icon } from "../components/icons.jsx";
import { useApi } from "../lib/api.js";
import { useProgress } from "../lib/progress.jsx";
import { placeholderPhotos } from "../lib/placeholderPhotos.js";
import { groupModules } from "../lib/groupModules.js";
import LibraryCard from "../components/library/LibraryCard.jsx";
import StartHerePath, { usePathProgress } from "../components/StartHerePath.jsx";
import "./LibraryPage.css";
import "./HomePage.css";

const VALUE_ACCENTS = ["brand", "sky", "lime"];

// The hub home page: header and search, overall progress, values and the module grid.
export default function HomePage() {
  const home = useApi("/home");
  const values = useApi("/values");
  const modules = useApi("/modules");
  const { countDone } = useProgress();
  const path = usePathProgress(home.data?.startHere);

  // The search words live in the page address (?q=), so Back returns to the results.
  const [params, setParams] = useSearchParams();
  const search = params.get("q") ?? "";
  const setSearch = (q) => setParams(q ? { q } : {}, { replace: true });
  const searching = search.trim().length >= 2;

  const error = home.error || values.error || modules.error;
  if (error || !home.data || !values.data || !modules.data) return <LoadState error={error} />;

  const { heroTitle, heroIntro, heroImage, philosophyTitle, philosophyText } = home.data;
  const total = modules.data.reduce((n, m) => n + (m.sectionKeys?.length ?? 0), 0);
  const done = modules.data.reduce((n, m) => n + countDone(m.slug, m.sectionKeys), 0);
  const overall = total ? (done / total) * 100 : 0;
  // The module to continue: the first one started but not finished, otherwise the first not finished.
  const groups = groupModules(modules.data);
  const counts = groups.flatMap((g) => g.modules).map((m) => [m, countDone(m.slug, m.sectionKeys), m.sectionKeys?.length ?? 0]);
  // The Start here path comes first while it has modules left.
  const resume = path.nextModule ?? (counts.find(([, d, t]) => d > 0 && d < t) ?? counts.find(([, d, t]) => d < t))?.[0];

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__pattern" aria-hidden="true" />
        <div className="hero__wave" aria-hidden="true"><Wave variant="glow" /></div>
        <div className="container hero__inner">
          <div className="hero__copy">
            <Eyebrow tone="ink">Stott and May</Eyebrow>
            <h1 id="hero-title" className="hero__title">{heroTitle}</h1>
            <p className="hero__lead">{heroIntro}</p>
            <div className="hero__actions">
              <SearchField value={search} onChange={setSearch} label="Search the hub" placeholder="Search training, forms and decks…" />
              <Button variant="dark" size="lg" icon="brain" to="/quiz">Take the quiz</Button>
            </div>
          </div>
          <div className="hero__visual">
            <ShapeImage src={heroImage?.url ?? placeholderPhotos.homeHero} alt={heroImage?.alt} shape="squircle" className="hero__person" />
            <div className="float-card float-card--progress" aria-hidden="true">
              <ProgressRing value={overall} size={56} stroke={7} label="Overall progress" />
              <div>
                <p className="float-card__label">Your progress</p>
                <p className="float-card__value">{done} of {total} sections</p>
              </div>
            </div>
            <div className="float-card float-card--badge" aria-hidden="true">
              <IconBadge name="trophy" variant="solid" size="sm" shape="circle" />
              <p className="float-card__value">Module complete!</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container home-stack">
        {searching ? (
          <SearchResults search={search} />
        ) : (
          <>
            {/* ── Overall progress ── */}
            <Card className="progress-card">
              <ProgressRing value={overall} size={104} label="Overall progress" />
              <div className="progress-card__body">
                <Eyebrow>Your progress</Eyebrow>
                <h2 className="progress-card__title">
                  {done === 0 ? "Ready when you are" : done === total ? "Every module complete" : "Keep the momentum going"}
                </h2>
                <ProgressBar value={overall} label={`${done} of ${total} sections complete`} showValue size="md" />
              </div>
              {resume && (
                <Button iconAfter="arrow-right" to={`/modules/${resume.slug}`}>
                  {done === 0 ? `Start with ${resume.title}` : `Continue ${resume.title}`}
                </Button>
              )}
            </Card>

            {/* ── Start here path for new starters ── */}
            {home.data.startHere && <StartHerePath path={home.data.startHere} />}

            {/* Concept only, in the preview build: the planned "Ask May" coach. */}
            {showMayConcept && <AskMayConcept />}

            {/* ── Philosophy and values ── */}
            <Card tone="soft" topBar={false} className="values" aria-labelledby="values-title">
              <div className="values__intro">
                <div>
                  <Eyebrow>Our philosophy</Eyebrow>
                  <h2 id="values-title" className="section-title">{philosophyTitle}</h2>
                  {philosophyText && <p className="section-lead">{philosophyText}</p>}
                  <Wave height={24} />
                </div>
                <ShapeImage src={placeholderPhotos.values} shape="rings" className="values__person" />
              </div>
              <Eyebrow>Our values</Eyebrow>
              <ul className="values__grid">
                {values.data.map((v, i) => (
                  <li key={v._id}>
                    <Card className="value-card" accent={VALUE_ACCENTS[i % VALUE_ACCENTS.length]}>
                      <IconBadge name={v.icon} variant="solid" accent={VALUE_ACCENTS[i % VALUE_ACCENTS.length]} />
                      <h3 className="value-card__title">{v.title}</h3>
                      <p className="value-card__desc">{v.description}</p>
                    </Card>
                  </li>
                ))}
              </ul>
            </Card>

            {/* ── Modules, in their groups (categories in Sanity) ── */}
            {groups.map((g, i) => (
              <section key={g.id} aria-labelledby={`modules-title-${i}`}>
                <div className="section-head">
                  <div>
                    <Eyebrow>{g.modules.length} {g.modules.length === 1 ? "module" : "modules"}</Eyebrow>
                    <h2 id={`modules-title-${i}`} className="section-title">{g.title}</h2>
                    {g.description && <p className="section-lead">{g.description}</p>}
                  </div>
                </div>
                <ul className="module-grid">
                  {g.modules.map((m) => (
                    <li key={m._id}><ModuleCard module={m} done={countDone(m.slug, m.sectionKeys)} /></li>
                  ))}
                </ul>
              </section>
            ))}
          </>
        )}
      </div>
    </>
  );
}

// Waits until the learner stops typing for a moment before searching.
function useDebounced(value, ms = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

function SearchResults({ search }) {
  const q = useDebounced(search.trim());
  const { data, error, loading } = useApi(`/search?q=${encodeURIComponent(q)}`);
  const { forms = [], files = [], sections = [] } = data ?? {};
  const total = forms.length + files.length + sections.length;

  return (
    <section aria-labelledby="results-title" className="search-results">
      <Eyebrow>Search</Eyebrow>
      <h2 id="results-title" className="section-title" aria-live="polite">
        {loading || !data ? "Searching…" : `${total} ${total === 1 ? "result" : "results"} for “${q}”`}
      </h2>
      {error && <p className="section-lead">{error.message}</p>}
      {data && total === 0 && <p className="section-lead">Nothing matches that. Try a shorter word, like “IR35”, “offer” or “counter”.</p>}

      {forms.length > 0 && (
        <ResultGroup id="results-forms" icon="clipboard-list" title="Forms" noun="forms" items={forms} show={4} q={q}>
          {(shown) => <ul className="search-results__list">
            {shown.map((f) => (
              <li key={f._id}>
                <Card as={Link} to={`/documents/${f.slug}`} interactive className="search-result search-result--form">
                  <IconBadge name={f.icon || "clipboard-list"} size="sm" accent="sky" />
                  <span className="search-result__body">
                    <Eyebrow>{f.group} · {f.kind}</Eyebrow>
                    <h4 className="search-result__title">{f.title}</h4>
                    {f.extract && <p className="search-result__extract">{f.extract}</p>}
                    <span className="search-result__go">Open form <Icon name="arrow-right" size={14} /></span>
                  </span>
                </Card>
              </li>
            ))}
          </ul>}
        </ResultGroup>
      )}

      {files.length > 0 && (
        <ResultGroup id="results-library" icon="library" title="Library" noun="Library files" items={files} show={3} q={q}>
          {(shown) => <ul className="library-grid search-results__files">
            {shown.map((item) => <li key={item._id}><LibraryCard item={item} headingLevel={4} /></li>)}
          </ul>}
        </ResultGroup>
      )}

      {sections.length > 0 && (
        <ResultGroup id="results-training" icon="graduation-cap" title="Training" noun="training sections" items={sections} show={6} q={q}>
          {(shown) => <ul className="search-results__list">
            {shown.map((r) => (
              <li key={`${r.module.slug}-${r.section.index}`}>
                <Card as={Link} to={`/modules/${r.module.slug}?section=${r.section.index + 1}`} interactive accent={r.module.accent} className="search-result">
                  <Eyebrow>{r.module.title} · {r.kind}</Eyebrow>
                  <h4 className="search-result__title">{r.section.title}</h4>
                  <p className="search-result__extract">{r.extract}</p>
                  <span className="search-result__go">Open section <Icon name="arrow-right" size={14} /></span>
                </Card>
              </li>
            ))}
          </ul>}
        </ResultGroup>
      )}
    </section>
  );
}

// One group of search results (Forms, Library or Training) under its own heading. Shows the
// best few, with a button for the rest; a new search starts short again.
function ResultGroup({ id, icon, title, noun, items, show, q, children }) {
  const [allFor, setAllFor] = useState(null);
  const all = allFor === q;
  const hidden = items.length - show;
  return (
    <section className="search-results__group" aria-labelledby={id}>
      <h3 id={id} className="search-results__group-title">
        <Icon name={icon} size={20} /> {title} <span className="search-results__count">{items.length}</span>
      </h3>
      {children(all ? items : items.slice(0, show))}
      {hidden > 0 && (
        <Button variant="secondary" size="sm" className="search-results__more" icon={all ? "chevron-up" : "chevron-down"} onClick={() => setAllFor(all ? null : q)} aria-expanded={all}>
          {all ? `Show fewer ${noun}` : `Show all ${items.length} ${noun}`}
        </Button>
      )}
    </section>
  );
}
