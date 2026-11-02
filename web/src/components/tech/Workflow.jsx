import { Link } from "react-router";
import Eyebrow from "../Eyebrow.jsx";
import ToolMark from "./ToolMark.jsx";

const STAGES = { plan: "Plan", prospect: "Prospect and engage", cover: "Cover jobs and log" };

// The daily workflow of a 360 recruiter: numbered steps, coloured by part of the day, with the
// tools each one uses.
export default function Workflow({ steps = [] }) {
  if (!steps.length) return null;
  const used = Object.keys(STAGES).filter((s) => steps.some((st) => st.stage === s));
  return (
    <section className="workflow" aria-labelledby="workflow-title">
      <Eyebrow>A day in the life</Eyebrow>
      <h2 id="workflow-title" className="section-title">Daily workflow of a 360 recruiter</h2>
      <ul className="workflow__key" aria-label="Parts of the day">
        {used.map((s) => <li key={s} className={`workflow__stage workflow__stage--${s}`}>{STAGES[s]}</li>)}
      </ul>
      <ol className="workflow__steps">
        {steps.map((st, i) => (
          <li key={st._key ?? i} className={`workflow__step workflow__step--${st.stage || "plan"}`}>
            <span className="workflow__number" aria-hidden="true">{i + 1}</span>
            <div className="workflow__body">
              <h3 className="workflow__title">{st.title}</h3>
              {st.text && <p className="workflow__text">{st.text}</p>}
              {st.tools?.filter(Boolean).length > 0 && (
                <ul className="workflow__tools" aria-label="Tools">
                  {st.tools.filter(Boolean).map((t) => (
                    <li key={t.slug}><Link to={`/tech/${t.slug}`} className="workflow__tool"><ToolMark tool={t} size="sm" /> {t.name}</Link></li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
