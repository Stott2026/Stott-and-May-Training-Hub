import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import LoadState from "../components/LoadState.jsx";
import ModuleHero from "../components/module/ModuleHero.jsx";
import SectionJourney from "../components/module/SectionJourney.jsx";
import SectionView from "../components/module/SectionView.jsx";
import ModuleComplete from "../components/module/ModuleComplete.jsx";
import { useApi } from "../lib/api.js";
import { useProgress } from "../lib/progress.jsx";
import { placeholderPhotos } from "../lib/placeholderPhotos.js";
import "./ModulePage.css";

// The page at /modules/<address>. Loads the module from the server.
// ?section=3 opens the third section (used by search results).
export default function ModulePage() {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const { data: module, error } = useApi(`/modules/${slug}`);
  const progress = useProgress();

  useEffect(() => { if (module) document.title = `${module.title} · Stott and May Training Hub`; }, [module]);
  if (error || !module || module.slug !== slug) return <LoadState error={error} notFoundText="We couldn't find that module" />;

  // The module view works with section numbers; progress is stored by section key.
  const completed = Object.fromEntries(module.sections.map((s, i) => [i, progress.isDone(slug, s._key)]));
  const requested = Number(params.get("section")) - 1;
  return (
    <ModuleView
      key={`${slug}-${requested}`}
      module={module}
      startAt={requested >= 0 && requested < module.sections.length ? requested : undefined}
      completed={completed}
      onToggleComplete={(i) => progress.toggle(slug, module.sections[i]._key)}
    />
  );
}

// Rough reading time: words at 200 per minute, plus two minutes per section to practise.
function estimateMinutes(module) {
  if (module.estimatedMinutes) return module.estimatedMinutes;
  const text = module.sections
    .flatMap((s) => [s.content, ...(s.tactics || []), ...(s.phrases || []), ...(s.mistakes || []), s.scenario?.title, s.scenario?.weak, s.scenario?.strong])
    .filter(Boolean)
    .join(" ");
  const words = text.split(/\s+/).length;
  return Math.max(5, Math.round((words / 200 + module.sections.length * 2) / 5) * 5);
}

// A training module: hero, journey map and one section at a time.
function ModuleView({ module, startAt, completed, onToggleComplete }) {
  const firstOpen = module.sections.findIndex((_, i) => !completed[i]);
  const [current, setCurrent] = useState(startAt ?? (firstOpen === -1 ? 0 : firstOpen));
  const [celebrate, setCelebrate] = useState(false);
  const contentRef = useRef(null);
  const total = module.sections.length;
  const done = module.sections.filter((_, i) => completed[i]).length;

  const goTo = (i) => {
    setCelebrate(false);
    setCurrent(i);
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  useEffect(() => { contentRef.current?.focus({ preventScroll: true }); }, [current, celebrate]);

  const completeAndContinue = () => {
    if (!completed[current]) onToggleComplete(current);
    const remaining = module.sections.findIndex((_, i) => i !== current && !completed[i]);
    if (remaining === -1) {
      setCelebrate(true);
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      goTo(current + 1 < total && !completed[current + 1] ? current + 1 : remaining);
    }
  };

  return (
    <>
      <ModuleHero module={module} done={done} minutes={estimateMinutes(module)} onStart={() => goTo(firstOpen === -1 ? 0 : firstOpen)} />
      <div className="container module-layout">
        <aside className="module-layout__side">
          <SectionJourney sections={module.sections} current={celebrate ? -1 : current} completed={completed} onSelect={goTo} />
        </aside>
        <div className="module-layout__main" ref={contentRef} tabIndex={-1}>
          {celebrate ? (
            <ModuleComplete module={module} nextModule={module.next} onReview={() => goTo(0)} />
          ) : (
            <SectionView
              section={module.sections[current]}
              index={current}
              total={total}
              completed={!!completed[current]}
              avatar={placeholderPhotos.phraseAvatar}
              onComplete={completeAndContinue}
              onPrevious={() => goTo(Math.max(0, current - 1))}
              onNext={() => (current === total - 1 ? (done === total ? setCelebrate(true) : goTo(module.sections.findIndex((_, i) => !completed[i]))) : goTo(current + 1))}
            />
          )}
        </div>
      </div>
    </>
  );
}
