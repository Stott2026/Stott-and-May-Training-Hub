import { useId } from "react";
import "./FormBlocks.css";

// Renders a form's blocks from Sanity. Every value is read and written by a key made from the
// block's key, so editing a form's wording in the Studio doesn't lose what people have typed.
export default function FormBlocks({ blocks = [], values, set }) {
  return (
    <div className="form-blocks">
      {blocks.map((b) => {
        const Block = BLOCKS[b._type];
        return Block ? <Block key={b._key} block={b} values={values} set={set} /> : null;
      })}
    </div>
  );
}

function Heading({ block }) {
  return <h2 className="form-heading">{block.title}</h2>;
}

function Field({ block, values, set }) {
  const id = useId();
  const multi = (block.lines ?? 1) > 1;
  const props = { id, value: values[block._key] ?? "", placeholder: block.placeholder ?? "", onChange: (e) => set(block._key, e.target.value), className: "form-input" };
  return (
    <div className={`form-field form-field--${block.width ?? "full"}`}>
      <label htmlFor={id} className="form-label">{block.label}</label>
      {multi ? <textarea rows={block.lines} {...props} /> : <input type="text" {...props} />}
    </div>
  );
}

function Choice({ block, values, set }) {
  const name = useId();
  const current = values[block._key] ?? "";
  return (
    <fieldset className="form-choice">
      <legend className="form-label">{block.label}</legend>
      <div className="form-choice__options">
        {(block.options ?? []).map((o) => (
          <label key={o} className="form-pill">
            <input type="radio" name={name} value={o} checked={current === o} onChange={() => set(block._key, o)} />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Score({ block, values, set }) {
  const name = useId();
  const current = Number(values[block._key] ?? 0);
  return (
    <fieldset className="form-score">
      <legend className="form-score__label">
        <span>{block.label}</span>
        <span className="form-score__value">{current ? `${current}/10` : "Not scored"}</span>
      </legend>
      <div className="form-score__scale">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <label key={n} className={`form-score__step${n <= current ? " is-on" : ""}`}>
            <input type="radio" name={name} value={n} checked={current === n} onChange={() => set(block._key, n)} />
            <span>{n}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Checklist({ block, values, set }) {
  return (
    <ul className="form-checklist">
      {(block.items ?? []).map((item, i) => {
        const k = `${block._key}:${i}`;
        return (
          <li key={k}>
            <label className="form-check">
              <input type="checkbox" checked={!!values[k]} onChange={(e) => set(k, e.target.checked)} />
              <span>{item}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

function Guide({ block }) {
  return (
    <ol className="form-guide">
      {(block.steps ?? []).map((s) => (
        <li key={s._key} className="form-guide__step">
          {s.tag && <span className="form-guide__tag">{s.tag}</span>}
          <div>
            {s.title && <p className="form-guide__title">{s.title}</p>}
            <p className="form-guide__text">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Prompts({ block, values, set }) {
  return (
    <div className="form-prompts">
      {(block.cards ?? []).map((c) => {
        const k = `${block._key}:${c._key}`;
        return (
          <div key={c._key} className="form-prompt">
            <div className="form-prompt__head">
              {c.tag && <span className="form-prompt__tag" aria-hidden="true">{c.tag}</span>}
              <label htmlFor={k} className="form-prompt__title">{c.title}</label>
            </div>
            {c.question && <p className="form-prompt__question">{c.question}</p>}
            <textarea id={k} rows={2} className="form-input" placeholder="Your assessment" value={values[k] ?? ""} onChange={(e) => set(k, e.target.value)} />
          </div>
        );
      })}
    </div>
  );
}

function Numbers({ block, values, set }) {
  return (
    <div className="form-numbers">
      {(block.items ?? []).map((item) => {
        const k = `${block._key}:${item._key}`;
        return (
          <div key={item._key} className="form-number">
            <input id={k} inputMode="decimal" className="form-number__input" placeholder="0" value={values[k] ?? ""} onChange={(e) => set(k, e.target.value)} />
            <label htmlFor={k} className="form-number__label">{item.label}</label>
            {item.target && <span className="form-number__target">Target: {item.target}</span>}
          </div>
        );
      })}
    </div>
  );
}

function Rows({ block, values, set }) {
  const groups = block.groups?.length ? block.groups : [null];
  const per = block.rowsPerGroup ?? 1;
  const cols = block.columns ?? [];
  return (
    <div className="form-rows">
      {groups.map((g, gi) => (
        <section key={gi} className="form-rows__group" aria-label={g ?? undefined}>
          {g && <h3 className="form-rows__title">{g}</h3>}
          <div className="form-rows__list" style={{ "--cols": cols.length }}>
            {Array.from({ length: per }, (_, r) => (
              <div key={r} className="form-rows__row">
                {cols.map((c) => {
                  const k = `${block._key}:${gi}:${r}:${c._key}`;
                  const name = [g, per > 1 ? `row ${r + 1}` : null, c.label].filter(Boolean).join(", ");
                  const common = { value: values[k] ?? "", onChange: (e) => set(k, e.target.value), className: `form-input${c.kind === "number" ? " form-input--number" : ""}`, "aria-label": name };
                  return (
                    <div key={c._key} className={`form-rows__cell form-rows__cell--${c.kind ?? "text"}`}>
                      <span className={`form-rows__label${r > 0 ? " form-rows__label--repeat" : ""}`} aria-hidden="true">{c.label}</span>
                      {c.kind === "long" ? <textarea rows={2} {...common} /> : <input inputMode={c.kind === "number" ? "decimal" : undefined} placeholder={c.kind === "number" ? "0" : ""} {...common} />}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const BLOCKS = {
  formHeading: Heading, formField: Field, formChoice: Choice, formScore: Score, formChecklist: Checklist,
  formGuide: Guide, formPrompts: Prompts, formNumbers: Numbers, formRows: Rows,
};
