import { useEffect } from "react";
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

// The Technology tab: the day-one rule, every tool, the daily Big 5 check, the daily workflow,
// which tool does what, and the 12-week programme. All of it comes from Sanity.
export default function TechPage() {
  const { data, error } = useApi("/tech");
  useEffect(() => { document.title = "Technology · Stott and May Training Hub"; }, []);
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

  return (
    <>
      <PageHero eyebrow="Stott and May" title={page.title || "Technology"} intro={page.intro} photo={placeholderPhotos.values}>
        <ul className="tech-facts">
          {core.length > 0 && <li><Icon name="laptop" size={16} /> {core.length} core systems</li>}
          {page.phases?.length > 0 && <li><Icon name="shield-check" size={16} /> {page.phases.length} gated phases</li>}
          {more.length > 0 && <li><Icon name="plus" size={16} /> {more.length} more tools</li>}
        </ul>
      </PageHero>

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
          <section aria-labelledby="core-title">
            <Eyebrow>Learn them in this order</Eyebrow>
            <h2 id="core-title" className="section-title">The core systems</h2>
            <ul className="tool-grid">{core.map((t) => <li key={t._id}><ToolCard tool={t} /></li>)}</ul>
          </section>
        )}

        <BigFiveCheck tools={tools} intro={page.bigFiveIntro} />
        <Workflow steps={page.workflow} />
        <CapabilityMap tools={tools} note={page.mapNote} />

        {more.length > 0 && (
          <section aria-labelledby="more-title">
            <Eyebrow>Also in your toolkit</Eyebrow>
            <h2 id="more-title" className="section-title">More tools</h2>
            <ul className="tool-grid">{more.map((t) => <li key={t._id}><ToolCard tool={t} /></li>)}</ul>
          </section>
        )}

        <Programme page={page} />
      </div>
    </>
  );
}

