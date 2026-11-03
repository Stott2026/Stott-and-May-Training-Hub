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
import { usePathProgress } from "../components/StartHerePath.jsx";
import { useAchievements } from "../lib/achievements.jsx";
import { MeetMayCard } from "../components/AskMay.jsx";
import "./LibraryPage.css";
import "./HomePage.css";

const GROUP_KEY = "sm-hub-module-group";

// The Training page: header and search, progress (with achievements), a pointer to the Start here
// path for new starters, and the modules one group at a time.
export default function HomePage() {
  const home = useApi("/home");
  const modules = useApi("/modules");
  const { countDone } = useProgress();
  const path = usePathProgress(home.data?.startHere);
  const ach = useAchievements();
  // The module group being shown, remembered in this browser.
  const [groupId, setGroupId] = useState(() => { try { return localStorage.getItem(GROUP_KEY); } catch { return null; } });
  const chooseGroup = (id) => { setGroupId(id); try { localStorage.setItem(GROUP_KEY, id); } catch { /* not remembered */ } };

  // The search words live in the page address (?q=), so Back returns to the results.
  const [params, setParams] = useSearchParams();
  const search = params.get("q") ?? "";
  const setSearch = (q) => setParams(q ? { q } : {}, { replace: true });
  const searching = search.trim().length >= 2;

  const error = home.error || modules.error;
  if (error || !home.data || !modules.data) return <LoadState error={error} />;

  const { heroTitle, heroTitleAccent, heroIntro, heroImage } = home.data;
  const total = modules.data.reduce((n, m) => n + (m.sectionKeys?.length ?? 0), 0);
  const done = modules.data.reduce((n, m) => n + countDone(m.slug, m.sectionKeys), 0);
  const overall = total ? (done / total) * 100 : 0;
  // The module to continue: the first one started but not finished, otherwise the first not finished.
  const groups = groupModules(modules.data);
  const counts = groups.flatMap((g) => g.modules).map((m) => [m, countDone(m.slug, m.sectionKeys), m.sectionKeys?.length ?? 0]);
  // The Start here path comes first while it has modules left.
  const resume = path.nextModule ?? (counts.find(([, d, t]) => d > 0 && d < t) ?? counts.find(([, d, t]) => d < t))?.[0];
  const group = groups.find((g) => g.id === groupId) ?? groups[0];

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="brand-shapes" aria-hidden="true"><span /><span /><span /><span /></div>
        <div className="hero__wave" aria-hidden="true"><Wave variant="glow" /></div>
        <div className="container hero__inner">
          <div className="hero__copy">
            <Eyebrow>Stott and May</Eyebrow>
            <h1 id="hero-title" className="hero__title">{heroTitle}{heroTitleAccent && <span className="headline-accent">{heroTitleAccent}</span>}</h1>
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
            {/* ── Overall progress, with level, points, streak and badges ── */}
            <Card className="progress-card">
              <ProgressRing value={overall} size={104} label="Overall progress" />
              <div className="progress-card__body">
                <Eyebrow>Your progress</Eyebrow>
                <h2 className="progress-card__title">
                  {done === 0 ? "Ready when you are" : done === total ? "Every module complete" : "Keep the momentum going"}
                </h2>
                <ProgressBar value={overall} label={`${done} of ${total} sections complete`} showValue size="md" />
                {ach.enabled && (
                  <Link to="/achievements" className="progress-card__stats">
                    <span><Icon name="crown" size={16} /> Level {ach.levelIndex + 1} · {ach.level.title}</span>
                    <span><Icon name="star" size={16} /> {ach.points.toLocaleString("en-GB")} points</span>
                    <span><Icon name="flame" size={16} /> {ach.streak}-day streak</span>
                    <span><Icon name="award" size={16} /> {ach.badges.filter((b) => b.earned).length} of {ach.badges.length} badges</span>
                    <span className="progress-card__stats-go">See your achievements <Icon name="arrow-right" size={14} /></span>
                  </Link>
                )}
              </div>
              {resume && (
                <Button iconAfter="arrow-right" to={`/modules/${resume.slug}`}>
                  {done === 0 ? `Start with ${resume.title}` : `Continue ${resume.title}`}
                </Button>
              )}
            </Card>

            {/* ── New to the desk: a slim pointer to the Start here path until it's finished ── */}
            {path.current >= 0 && (
              <section className="start-strip" aria-labelledby="start-strip-title">
                <IconBadge name="rocket" variant="solid" />
                <div className="start-strip__body">
                  <Eyebrow>New to the desk?</Eyebrow>
                  <h2 id="start-strip-title" className="start-strip__title">
                    {path.finishedCount === 0 && path.current === 0 ? "Start here: a step-by-step path through the training" : `Step ${path.current + 1} of ${path.steps.length}: ${path.steps[path.current].title}`}
                  </h2>
                  <ol className="start-strip__steps" aria-label={`${path.steps.filter((st) => st.finished).length} of ${path.steps.length} steps done`}>
                    {path.steps.map((st, i) => <li key={st._key ?? i} className={st.finished ? "is-done" : i === path.current ? "is-current" : ""} />)}
                  </ol>
                </div>
                <Button variant="secondary" iconAfter="arrow-right" to="/start">See your path</Button>
              </section>
            )}

            {/* Concept only, in the preview build: the planned "Ask May" coach. */}
            {showMayConcept && <AskMayConcept />}
            <MeetMayCard />

            {/* ── Modules: one group at a time (groups are categories in Sanity) ── */}
            {group && (
              <section aria-labelledby="modules-title">
                <div className="section-head">
                  <div>
                    <Eyebrow>{modules.data.length} modules</Eyebrow>
                    <h2 id="modules-title" className="section-title">Training modules</h2>
                  </div>
                </div>
                {groups.length > 1 && (
                  <div className="library-filters module-groups" role="group" aria-label="Show modules from">
                    {groups.map((g) => (
                      <button key={g.id} type="button" className="library-filter" aria-pressed={g.id === group.id} onClick={() => chooseGroup(g.id)}>
                        <span>{g.title}</span>
                        <span className="library-filter__count">{g.modules.length}</span>
                      </button>
                    ))}
                  </div>
                )}
                {group.description && <p className="section-lead">{group.description}</p>}
                <ul className="module-grid" key={group.id}>
                  {group.modules.map((m) => (
                    <li key={m._id}><ModuleCard module={m} done={countDone(m.slug, m.sectionKeys)} /></li>
                  ))}
                </ul>
              </section>
            )}
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
  const { forms = [], files = [], tools = [], sections = [] } = data ?? {};
  const total = forms.length + files.length + tools.length + sections.length;

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

      {tools.length > 0 && (
        <ResultGroup id="results-tools" icon="laptop" title="Technology" noun="tools" items={tools} show={4} q={q}>
          {(shown) => <ul className="search-results__list">
            {shown.map((t) => (
              <li key={t._id}>
                <Card as={Link} to={`/tech/${t.slug}`} interactive accent={t.accent || "brand"} className="search-result search-result--form">
                  <IconBadge name={t.icon || "laptop"} size="sm" accent={t.accent || "brand"} />
                  <span className="search-result__body">
                    <Eyebrow>{t.role} · {t.kind}</Eyebrow>
                    <h4 className="search-result__title">{t.name}</h4>
                    {t.extract && <p className="search-result__extract">{t.extract}</p>}
                    <span className="search-result__go">Open tool <Icon name="arrow-right" size={14} /></span>
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
