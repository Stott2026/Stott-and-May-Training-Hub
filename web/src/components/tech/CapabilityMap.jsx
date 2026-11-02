import { useState } from "react";
import { Link } from "react-router";
import Eyebrow from "../Eyebrow.jsx";
import { Icon } from "../icons.jsx";
import ToolMark from "./ToolMark.jsx";
import { TOOL_CAPABILITIES } from "../../../../studio/schemaTypes/options.js";

// "Which tool does what": pick a job (find contacts, outreach…) and the tools that do it light
// up. Underneath, the full map as a table. The ticks come from each tool's "Jobs it does".
export default function CapabilityMap({ tools = [], note }) {
  const mapped = tools.filter((t) => t.capabilities?.length);
  const [job, setJob] = useState(null);
  if (!mapped.length) return null;
  const caps = TOOL_CAPABILITIES.filter((c) => mapped.some((t) => t.capabilities.includes(c.value)));
  const chosen = caps.find((c) => c.value === job);
  const matches = chosen ? mapped.filter((t) => t.capabilities.includes(chosen.value)) : [];

  return (
    <section className="cap-map" aria-labelledby="cap-map-title">
      <Eyebrow>Which tool does what</Eyebrow>
      <h2 id="cap-map-title" className="section-title" tabIndex={-1}>What do you need to do?</h2>
      <div className="library-filters cap-map__jobs" role="group" aria-label="Show the tools that">
        {caps.map((c) => (
          <button key={c.value} type="button" className="library-filter" aria-pressed={job === c.value} onClick={() => setJob(job === c.value ? null : c.value)}>
            <span>{c.title}</span>
            <span className="library-filter__count">{mapped.filter((t) => t.capabilities.includes(c.value)).length}</span>
          </button>
        ))}
      </div>
      <p className="cap-map__answer" role="status" aria-live="polite">
        {chosen ? <><strong>{chosen.title}:</strong> {matches.length} tools can do this.</> : "Pick a job to see which tools do it."}
      </p>
      {chosen && (
        <ul className="cap-map__matches">
          {matches.map((t) => (
            <li key={t._id}><Link to={`/tech/${t.slug}`} className="cap-map__tool"><ToolMark tool={t} size="sm" /> {t.name}</Link></li>
          ))}
        </ul>
      )}

      <div className="cap-map__table-wrap" tabIndex={0} aria-label="The full map: scrolls sideways on small screens">
        <table className="cap-map__table">
          <caption className="visually-hidden">Which tool does what</caption>
          <thead>
            <tr>
              <th scope="col">Tool</th>
              {caps.map((c) => <th key={c.value} scope="col" className={job === c.value ? "is-chosen" : ""}>{c.title}</th>)}
            </tr>
          </thead>
          <tbody>
            {mapped.map((t) => (
              <tr key={t._id} className={chosen && !t.capabilities.includes(chosen.value) ? "is-dim" : ""}>
                <th scope="row"><Link to={`/tech/${t.slug}`}>{t.name}</Link></th>
                {caps.map((c) => (
                  <td key={c.value} className={job === c.value ? "is-chosen" : ""}>
                    {t.capabilities.includes(c.value) ? <><Icon name="check" size={16} /><span className="visually-hidden">Yes</span></> : <span className="visually-hidden">No</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="cap-map__note">{note}</p>}
    </section>
  );
}
