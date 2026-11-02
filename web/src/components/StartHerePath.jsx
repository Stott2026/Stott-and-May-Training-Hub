import { Link } from "react-router";
import Eyebrow from "./Eyebrow.jsx";
import IconBadge from "./IconBadge.jsx";
import ProgressBar from "./ProgressBar.jsx";
import { Icon } from "./icons.jsx";
import { useProgress } from "../lib/progress.jsx";
import "./StartHerePath.css";

// Where someone is on the path: how far through each module, which steps are done, and the
// step to do next. Shared with the home page's "Start with…" button.
export function usePathProgress(path) {
  const { countDone } = useProgress();
  const steps = (path?.steps ?? []).map((step) => {
    const modules = (step.modules ?? []).filter(Boolean).map((m) => {
      const total = m.sectionKeys?.length ?? 0;
      const done = countDone(m.slug, m.sectionKeys);
      return { ...m, done, total, finished: total > 0 && done >= total };
    });
    return { ...step, modules, forms: (step.forms ?? []).filter(Boolean), finished: modules.length > 0 && modules.every((m) => m.finished) };
  }).filter((s) => s.modules.length);
  const current = steps.findIndex((s) => !s.finished);
  const all = steps.flatMap((s) => s.modules);
  // The next module on the path: the first one started but not finished in the current step, otherwise its first unfinished one.
  const nextModule = current >= 0 ? (steps[current].modules.find((m) => m.done > 0 && !m.finished) ?? steps[current].modules.find((m) => !m.finished)) : null;
  return { steps, current, nextModule, finishedCount: all.filter((m) => m.finished).length, moduleCount: all.length };
}

// The "Start here" path: a recommended order through the training for new starters.
// On the New to the desk page the page header already gives the title, so heading={false}.
export default function StartHerePath({ path, heading = true }) {
  const { steps, current, finishedCount, moduleCount } = usePathProgress(path);
  if (!steps.length) return null;
  const complete = current === -1;

  return (
    <section className="start-here" aria-labelledby="start-here-title">
      <div className="start-here__head">
        <div>
          <Eyebrow>{heading ? "New to the desk?" : `${steps.length} steps`}</Eyebrow>
          <h2 id="start-here-title" className="section-title">{heading ? path.title || "Start here" : "Your path"}</h2>
          {heading && path.intro && <p className="section-lead">{path.intro}</p>}
        </div>
        <div className="start-here__summary">
          <ProgressBar value={moduleCount ? (finishedCount / moduleCount) * 100 : 0} label={complete ? "Path complete" : `${finishedCount} of ${moduleCount} modules done`} size="sm" />
        </div>
      </div>

      <ol className="start-here__steps">
        {steps.map((step, i) => {
          const state = step.finished ? "done" : i === current ? "current" : "later";
          return (
            <li key={step._key ?? i} className={`path-step path-step--${state}`}>
              <span className="path-step__marker" aria-hidden="true">{step.finished ? <Icon name="check" size={18} /> : i + 1}</span>
              <div className="path-step__card">
                <div className="path-step__top">
                  <Eyebrow>Step {i + 1} · {step.timing}</Eyebrow>
                  {state === "current" && <span className="path-step__badge">Up next</span>}
                  {state === "done" && <span className="path-step__badge path-step__badge--done">Done</span>}
                </div>
                <h3 className="path-step__title">{step.title}</h3>
                {step.note && <p className="path-step__note">{step.note}</p>}

                <ul className="path-step__modules">
                  {step.modules.map((m) => (
                    <li key={m._id}>
                      <Link to={`/modules/${m.slug}`} className="path-module">
                        <IconBadge name={m.icon} size="sm" accent={m.accent} />
                        <span className="path-module__text">
                          <span className="path-module__title">{m.title}</span>
                          <span className="path-module__status">
                            {m.finished ? "Complete" : m.done > 0 ? `${m.done} of ${m.total} sections` : `${m.total} sections`}
                          </span>
                        </span>
                        {m.finished ? <Icon name="circle-check" size={20} className="path-module__tick" /> : <Icon name="arrow-right" size={18} className="path-module__go" />}
                      </Link>
                    </li>
                  ))}
                </ul>

                {step.forms.length > 0 && (
                  <div className="path-step__forms">
                    <span className="path-step__forms-label">Practise with</span>
                    <ul>
                      {step.forms.map((f) => (
                        <li key={f._id}>
                          <Link to={`/documents/${f.slug}`} className="path-form"><Icon name={f.icon || "clipboard-list"} size={16} /> {f.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
