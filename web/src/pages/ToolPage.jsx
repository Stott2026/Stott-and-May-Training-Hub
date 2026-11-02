import { useEffect } from "react";
import { Link, useParams } from "react-router";
import Eyebrow from "../components/Eyebrow.jsx";
import LoadState from "../components/LoadState.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import Wave from "../components/Wave.jsx";
import { Icon } from "../components/icons.jsx";
import ToolMark from "../components/tech/ToolMark.jsx";
import FlipCards from "../components/module/FlipCards.jsx";
import { useApi } from "../lib/api.js";
import { useProgress } from "../lib/progress.jsx";
import { TOOL_CAPABILITIES } from "../../../studio/schemaTypes/options.js";
import "../components/module/ModuleContent.css";
import "../components/module/Activities.css";
import "./Tech.css";

// One tool: what it's for, what you'll learn, the best practice (with flip cards to practise it),
// the set-up checklist, the daily check and what we track. All from the tool in Sanity.
export default function ToolPage() {
  const { slug } = useParams();
  const { data: tool, error } = useApi(`/tech/${slug}`);
  const progress = useProgress();
  useEffect(() => { if (tool) document.title = `${tool.name} · Technology · Stott and May Training Hub`; }, [tool]);
  if (error || !tool || tool.slug !== slug) return <LoadState error={error} notFoundText="We couldn't find that tool" />;

  const setup = tool.setup ?? [];
  const ticked = setup.filter((_, i) => progress.isSetupTicked(slug, i)).length;
  const practice = tool.bestPractice ?? [];
  const deckId = `tech/${slug}/best-practice`;
  const deck = {
    title: `Practise it: ${tool.name} best practice`,
    instructions: "Read the name, say what you do and how often, then flip to check.",
    cards: practice.map((b) => ({ front: `${b.title}: what do you do, and how often?`, back: `${b.when ? `${b.when}. ` : ""}${b.text}` })),
  };
  const caps = TOOL_CAPABILITIES.filter((c) => tool.capabilities?.includes(c.value));

  return (
    <>
      <section className="tool-hero" data-accent={tool.accent || "brand"} aria-labelledby="tool-title">
        <div className="tool-hero__wave" aria-hidden="true"><Wave variant="glow" /></div>
        <div className="container">
          <Link to="/tech" className="tool-hero__back"><Icon name="arrow-left" size={18} /> All tools</Link>
          <div className="tool-hero__inner">
            <ToolMark tool={tool} size="lg" />
            <div>
              <Eyebrow tone="ink">{[tool.family, tool.role].filter(Boolean).join(" · ")}</Eyebrow>
              <h1 id="tool-title" className="tool-hero__title">{tool.name}</h1>
              <p className="tool-hero__summary">{tool.summary}</p>
              <ul className="tech-facts">
                {tool.core && <li><Icon name="star" size={16} /> Core system</li>}
                {tool.week && <li><Icon name="calendar" size={16} /> {tool.week}</li>}
                {setup.length > 0 && <li><Icon name="list-checks" size={16} /> {ticked} of {setup.length} set up</li>}
              </ul>
              {tool.links?.length > 0 && (
                <div className="tool-hero__links">
                  {tool.links.map((l) => (
                    <a key={l._key ?? l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="btn btn--dark btn--md">
                      <Icon name="graduation-cap" size={18} /> {l.label} <Icon name="external-link" size={14} /><span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container tool-layout">
        <div className="tool-layout__main">
          {tool.why && <p className="tool-why"><Icon name="lightbulb" size={20} /> {tool.why}</p>}

          {tool.learn?.length > 0 && (
            <section className="content-block" aria-labelledby="learn-title">
              <h2 id="learn-title" className="tool-block__title"><Icon name="graduation-cap" size={20} /> What you'll learn</h2>
              <ol className="tool-learn">{tool.learn.map((l, i) => <li key={i}><span aria-hidden="true">{i + 1}</span>{l}</li>)}</ol>
            </section>
          )}

          {practice.length > 0 && (
            <section className="content-block" aria-labelledby="practice-title">
              <h2 id="practice-title" className="tool-block__title"><Icon name="star" size={20} /> Best practice: your top {practice.length}</h2>
              <ul className="tool-practice">
                {practice.map((b) => (
                  <li key={b._key ?? b.title} className="practice-card">
                    <div className="practice-card__head">
                      <h3 className="practice-card__title">{b.title}</h3>
                      {b.when && <span className="practice-card__when"><Icon name="clock" size={14} /> {b.when}</span>}
                    </div>
                    <p className="practice-card__text">{b.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {deck.cards.length >= 2 && (
            <FlipCards key={deckId} activity={deck} done={progress.isActivityDone(deckId)} onDone={() => progress.markActivity(deckId)} />
          )}
        </div>

        <aside className="tool-layout__side">
          {setup.length > 0 && (
            <section className="tool-side-card tool-setup" aria-labelledby="setup-title">
              <h2 id="setup-title" className="tool-block__title"><Icon name="list-checks" size={20} /> Set it up once</h2>
              <p className="tool-side-card__hint">Build these once, then tick them off when your team leader has seen them.</p>
              <ProgressBar value={(ticked / setup.length) * 100} size="sm" label={ticked === setup.length ? "All set up" : `${ticked} of ${setup.length} done`} />
              <ul className="tool-setup__list">
                {setup.map((item, i) => {
                  const on = progress.isSetupTicked(slug, i);
                  return (
                    <li key={i}>
                      <label className={`tool-setup__item${on ? " is-ticked" : ""}`}>
                        <input type="checkbox" checked={on} onChange={() => progress.toggleSetup(slug, i, setup.length)} />
                        <span className="tool-setup__box" aria-hidden="true"><Icon name="check" size={14} /></span>
                        <span>{item}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
          {tool.dailyCheck && (
            <section className="tool-side-card tool-daily" aria-labelledby="daily-title">
              <h2 id="daily-title" className="tool-block__title"><Icon name="flame" size={20} /> Every morning</h2>
              <p className="tool-daily__check">{tool.dailyCheck}</p>
              <Link to="/tech#big-five-title" className="tool-side-card__link">Part of the daily Big 5 check <Icon name="arrow-right" size={14} /></Link>
            </section>
          )}
          {caps.length > 0 && (
            <section className="tool-side-card" aria-labelledby="jobs-title">
              <h2 id="jobs-title" className="tool-block__title"><Icon name="target" size={20} /> Use it to</h2>
              <ul className="tool-jobs">{caps.map((c) => <li key={c.value}>{c.title}</li>)}</ul>
            </section>
          )}
          {tool.measures && (
            <section className="tool-side-card" aria-labelledby="measures-title">
              <h2 id="measures-title" className="tool-block__title"><Icon name="chart-column" size={20} /> What we track</h2>
              <p className="tool-side-card__hint">{tool.measures}</p>
            </section>
          )}
        </aside>
      </div>

      <nav className="container tool-next" aria-label="More tools">
        {tool.previous ? <Link to={`/tech/${tool.previous.slug}`} className="tool-next__link"><Icon name="arrow-left" size={16} /> {tool.previous.name}</Link> : <span />}
        {tool.next && <Link to={`/tech/${tool.next.slug}`} className="tool-next__link tool-next__link--next">Next: {tool.next.name} <Icon name="arrow-right" size={16} /></Link>}
      </nav>
    </>
  );
}
