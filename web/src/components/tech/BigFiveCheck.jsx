import { Link } from "react-router";
import Eyebrow from "../Eyebrow.jsx";
import ProgressBar from "../ProgressBar.jsx";
import { Icon } from "../icons.jsx";
import ToolMark from "./ToolMark.jsx";
import { useProgress } from "../../lib/progress.jsx";

// The daily Big 5 check: one check per tool (each tool's "Daily check" in Sanity). The ticks are
// for today only and start fresh each morning.
export default function BigFiveCheck({ tools = [], intro }) {
  const { bigFiveToday, toggleBigFive, bigFiveDays } = useProgress();
  const checks = tools.filter((t) => t.dailyCheck);
  if (!checks.length) return null;
  const done = checks.filter((t) => bigFiveToday[t.slug]).length;
  const all = done === checks.length;
  return (
    <section className={`big-five${all ? " is-done" : ""}`} aria-labelledby="big-five-title">
      <div className="big-five__head">
        <div>
          <Eyebrow>Every morning</Eyebrow>
          <h2 id="big-five-title" className="section-title" tabIndex={-1}>The daily Big {checks.length} check</h2>
          {intro && <p className="section-lead">{intro}</p>}
        </div>
        <div className="big-five__score">
          <ProgressBar value={(done / checks.length) * 100} label={all ? "All done for today" : `${done} of ${checks.length} done today`} size="md" />
          {bigFiveDays > 0 && <p className="big-five__days"><Icon name="flame" size={16} /> Completed on {bigFiveDays} {bigFiveDays === 1 ? "day" : "days"}</p>}
        </div>
      </div>
      <ul className="big-five__list">
        {checks.map((t) => {
          const ticked = !!bigFiveToday[t.slug];
          return (
            <li key={t._id} className={`big-five__item${ticked ? " is-ticked" : ""}`}>
              <label className="big-five__label">
                <input type="checkbox" className="big-five__box" checked={ticked} onChange={() => toggleBigFive(t.slug, checks.length)} />
                <span className="big-five__tick" aria-hidden="true"><Icon name="check" size={16} /></span>
                <ToolMark tool={t} size="sm" />
                <span className="big-five__text">
                  <span className="big-five__tool">{t.name}</span>
                  <span className="big-five__check">{t.dailyCheck}</span>
                </span>
              </label>
              <Link to={`/tech/${t.slug}`} className="big-five__more" aria-label={`More about ${t.name}`}><Icon name="arrow-right" size={16} /></Link>
            </li>
          );
        })}
      </ul>
      {all && <p className="big-five__well-done" role="status"><Icon name="party-popper" size={18} /> Your to-do list is built. Go and work it.</p>}
    </section>
  );
}
