import { useEffect, useId, useState } from "react";
import { Link, useParams } from "react-router";
import Button from "../components/Button.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
import IconBadge from "../components/IconBadge.jsx";
import LoadState from "../components/LoadState.jsx";
import FormBlocks from "../components/forms/FormBlocks.jsx";
import { Icon } from "../components/icons.jsx";
import { useApi } from "../lib/api.js";
import { useFormDraft } from "../lib/formDrafts.js";
import "./FormPage.css";

// One fillable form. What people type stays in their own browser, and the page prints cleanly
// (or saves as a PDF from the print dialogue).
export default function FormPage() {
  const { slug } = useParams();
  const { data: form, error } = useApi(`/forms/${slug}`);
  const draft = useFormDraft(slug);
  const [confirming, setConfirming] = useState(false);
  useEffect(() => { if (form) document.title = `${form.title} · Stott and May Training Hub`; }, [form]);
  if (error || !form || form.slug !== slug) return <LoadState error={error} notFoundText="We couldn't find that form" />;

  return (
    <div className="container form-page">
      <Link to="/documents" className="form-page__back"><Icon name="arrow-left" size={18} /> All documents and forms</Link>

      <article className="form-sheet" aria-labelledby="form-title">
        <header className="form-sheet__head">
          <IconBadge name={form.icon} variant="solid" />
          <div>
            <Eyebrow>Stott and May · {form.group}</Eyebrow>
            <h1 id="form-title" className="form-sheet__title">{form.title}</h1>
            {form.intro && <p className="form-sheet__intro">{form.intro}</p>}
          </div>
        </header>

        <div className="form-sheet__actions">
          <p className="form-sheet__saved" aria-live="polite">
            <Icon name="shield-check" size={16} />
            {draft.savedAt ? "Saved on this computer only" : "What you type is saved on this computer only"}
          </p>
          <div className="form-sheet__buttons">
            <Button variant="secondary" size="sm" icon="printer" onClick={() => window.print()}>Print or save as PDF</Button>
            {confirming ? (
              <span className="form-sheet__confirm">
                Clear everything?
                <Button variant="dark" size="sm" onClick={() => { draft.clear(); setConfirming(false); }}>Yes, clear</Button>
                <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>Keep it</Button>
              </span>
            ) : (
              <Button variant="ghost" size="sm" icon="rotate-ccw" onClick={() => setConfirming(true)} disabled={!draft.hasAnything}>Clear form</Button>
            )}
          </div>
        </div>

        <div className="form-sheet__meta">
          {["Consultant", "Date", "Office"].map((f) => <MetaField key={f} label={f} draft={draft} />)}
        </div>

        <FormBlocks blocks={form.blocks} values={draft.values} set={draft.set} />
      </article>

      {form.usedIn?.length > 0 && (
        <nav className="form-page__training" aria-labelledby="form-training-title">
          <h2 id="form-training-title" className="form-page__training-title">Learn more in the training</h2>
          <ul className="form-page__training-list">
            {form.usedIn.map((m) => (
              <li key={m._id}>
                <Link to={`/modules/${m.slug}`} className="form-page__training-link">
                  <Icon name="graduation-cap" size={18} /> {m.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

function MetaField({ label, draft }) {
  const id = useId();
  const k = `meta:${label}`;
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">{label}</label>
      <input id={id} className="form-input" value={draft.values[k] ?? ""} onChange={(e) => draft.set(k, e.target.value)} />
    </div>
  );
}
