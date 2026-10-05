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
import { Icon } from "../components/icons.jsx";
import { useApi } from "../lib/api.js";
import { useProgress } from "../lib/progress.jsx";
import { placeholderPhotos } from "../lib/placeholderPhotos.js";
import "./HomePage.css";

const VALUE_ACCENTS = ["brand", "sky", "lime"];

// The hub home page: header and search, overall progress, values and the module grid.
export default function HomePage() {
  const home = useApi("/home");
  const values = useApi("/values");
  const modules = useApi("/modules");
  const { countDone } = useProgress();

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
  const counts = modules.data.map((m) => [m, countDone(m.slug, m.sectionKeys), m.sectionKeys?.length ?? 0]);
  const resume = (counts.find(([, d, t]) => d > 0 && d < t) ?? counts.find(([, d, t]) => d < t))?.[0];

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
              <SearchField value={search} onChange={setSearch} label="Search the hub" placeholder="Search tactics, phrases, scenarios…" />
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

            {/* ── Modules ── */}
            <section aria-labelledby="modules-title">
              <div className="section-head">
                <div>
                  <Eyebrow>Training modules</Eyebrow>
                  <h2 id="modules-title" className="section-title">{modules.data.length} modules, from first call to placement</h2>
                </div>
              </div>
              <ul className="module-grid">
                {modules.data.map((m) => (
                  <li key={m._id}><ModuleCard module={m} done={countDone(m.slug, m.sectionKeys)} /></li>
                ))}
              </ul>
            </section>
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

  return (
    <section aria-labelledby="results-title" className="search-results">
      <Eyebrow>Search</Eyebrow>
      <h2 id="results-title" className="section-title" aria-live="polite">
        {loading || !data ? "Searching…" : `${data.length} ${data.length === 1 ? "result" : "results"} for “${q}”`}
      </h2>
      {error && <p className="section-lead">{error.message}</p>}
      {data?.length === 0 && <p className="section-lead">Nothing matches that. Try a shorter word, like “IR35” or “counter”.</p>}
      {data?.length > 0 && (
        <ul className="search-results__list">
          {data.map((r) => (
            <li key={`${r.module.slug}-${r.section.index}`}>
              <Card as={Link} to={`/modules/${r.module.slug}?section=${r.section.index + 1}`} interactive accent={r.module.accent} className="search-result">
                <Eyebrow>{r.module.title} · {r.kind}</Eyebrow>
                <h3 className="search-result__title">{r.section.title}</h3>
                <p className="search-result__extract">{r.extract}</p>
                <span className="search-result__go">Open section <Icon name="arrow-right" size={14} /></span>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
