import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import Eyebrow from "../components/Eyebrow.jsx";
import LoadState from "../components/LoadState.jsx";
import PageHero from "../components/PageHero.jsx";
import { Icon } from "../components/icons.jsx";
import ToolCard from "../components/tech/ToolCard.jsx";
import BigFiveCheck from "../components/tech/BigFiveCheck.jsx";
import Workflow from "../components/tech/Workflow.jsx";
import CapabilityMap from "../components/tech/CapabilityMap.jsx";
import Programme from "../components/tech/Programme.jsx";
import { useApi } from "../lib/api.js";
import { placeholderPhotos } from "../lib/placeholderPhotos.js";
import "./Tech.css";
import { usePageTitle } from "../lib/site.jsx";

// A bar of links to the page's sections, which stays in view under the top bar and shows the
// section you're in.
function JumpBar({ links }) {
  const [current, setCurrent] = useState(links[0]?.id);
  useEffect(() => {
    const seen = new Map();
    const watch = new IntersectionObserver((entries) => {
      for (const e of entries) seen.set(e.target.id, e.isIntersecting);
      const first = links.find((l) => seen.get(l.id));
      if (first) setCurrent(first.id);
    }, { rootMargin: "-30% 0px -60% 0px" });
    for (const l of links) { const el = document.getElementById(l.id); if (el) watch.observe(el); }
    return () => watch.disconnect();
  }, [links]);
  const go = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    el?.querySelector("h2")?.focus({ preventScroll: true });
    setCurrent(id);
  };
  return (
    <nav className="jump-bar" aria-label="On this page">
      <ul>
        {links.map((l) => (
          <li key={l.id}><button type="button" className="jump-bar__link" aria-current={current === l.id ? "true" : undefined} onClick={() => go(l.id)}>{l.label}</button></li>
        ))}
      </ul>
    </nav>
  );
}

// The Technology tab: the day-one rule, every tool, the daily Big 5 check, the daily workflow,
// which tool does what, and the 12-week programme. All of it comes from Sanity.
export default function TechPage() {
  const { data, error } = useApi("/tech");
  usePageTitle("Technology");
  // Links such as "Part of the daily Big 5 check" end in #big-five-title: scroll there once loaded.
  const { hash } = useLocation();
  useEffect(() => {
    if (data && hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
  }, [data, hash]);
  if (error || !data) return <LoadState error={error} />;
  const page = data.page ?? {};
  const tools = data.tools ?? [];
  const core = tools.filter((t) => t.core);
  const more = tools.filter((t) => !t.core);
  const feeders = tools.filter((t) => t.core && t.slug !== page.ruleTool?.slug);
  const jumps = [
    core.length > 0 && { id: "tools", label: "Core systems" },
    tools.some((t) => t.dailyCheck) && { id: "daily", label: "Daily Big 5" },
    page.workflow?.length > 0 && { id: "workflow", label: "Daily workflow" },
    tools.some((t) => t.capabilities?.length) && { id: "which-tool", label: "Which tool" },
    more.length > 0 && { id: "more-tools", label: "More tools" },
    page.phases?.length > 0 && { id: "programme", label: "Programme" },
  ].filter(Boolean);

  // Technology is the pilot for the brand's dark mode (tokens.css, [data-theme="dark"]).
  return (
    <div className="theme-dark" data-theme="dark">
      <PageHero
        eyebrow="Stott and May"
        title={<>{page.title || "Technology"}{page.titleAccent && <span className="headline-accent">{page.titleAccent}</span>}</>}
        intro={page.intro}
        photo={placeholderPhotos.tech}
        decoration={<div className="brand-shapes" aria-hidden="true"><span /><span /><span /><span /></div>}
      >
        <ul className="stat-tiles">
          {core.length > 0 && <li className="stat-tile"><span className="stat-tile__number">{core.length}</span><span className="stat-tile__label">core systems</span></li>}
          {page.phases?.length > 0 && <li className="stat-tile"><span className="stat-tile__number">{page.phases.length}</span><span className="stat-tile__label">gated phases</span></li>}
          {tools.length > 0 && <li className="stat-tile"><span className="stat-tile__number">{tools.length}</span><span className="stat-tile__label">tools to master</span></li>}
        </ul>
      </PageHero>

      <JumpBar links={jumps} />
      <div className="container tech-page">
        {page.ruleTitle && (
          <section className="tech-rule" aria-labelledby="tech-rule-title">
            <div>
              <Eyebrow tone="ink">The rule for day one</Eyebrow>
              <h2 id="tech-rule-title" className="tech-rule__title">{page.ruleTitle}</h2>
              {page.ruleText && <p className="tech-rule__text">{page.ruleText}</p>}
            </div>
            {page.ruleTool && (
              <div className="tech-rule__flow" aria-hidden="true">
                <span className="tech-rule__feeders">{feeders.map((t) => <span key={t._id} className="tech-rule__chip">{t.name}</span>)}</span>
                <Icon name="arrow-right" size={28} className="tech-rule__arrow" />
                <Link to={`/tech/${page.ruleTool.slug}`} className="tech-rule__target" tabIndex={-1}>{page.ruleTool.name}</Link>
              </div>
            )}
          </section>
        )}

        {core.length > 0 && (
          <section id="tools" aria-labelledby="core-title">
            <Eyebrow>Learn them in this order</Eyebrow>
            <h2 id="core-title" className="section-title" tabIndex={-1}>The core systems</h2>
            <ul className="tool-grid">{core.map((t) => <li key={t._id}><ToolCard tool={t} /></li>)}</ul>
          </section>
        )}

        <div id="daily"><BigFiveCheck tools={tools} intro={page.bigFiveIntro} /></div>
        <div id="workflow"><Workflow steps={page.workflow} /></div>
        <div id="which-tool"><CapabilityMap tools={tools} note={page.mapNote} /></div>

        {more.length > 0 && (
          <section id="more-tools" aria-labelledby="more-title">
            <Eyebrow>Also in your toolkit</Eyebrow>
            <h2 id="more-title" className="section-title" tabIndex={-1}>More tools</h2>
            <ul className="tool-grid">{more.map((t) => <li key={t._id}><ToolCard tool={t} /></li>)}</ul>
          </section>
        )}

        <div id="programme"><Programme page={page} /></div>
      </div>
    </div>
  );
}

