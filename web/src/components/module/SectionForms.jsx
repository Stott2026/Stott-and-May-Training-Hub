import { Link } from "react-router";
import IconBadge from "../IconBadge.jsx";
import { Icon } from "../icons.jsx";

// "Use this form" cards: fillable forms from the Documents & Forms tab that go with this section.
export default function SectionForms({ forms = [] }) {
  const list = forms.filter((f) => f?.slug);
  if (!list.length) return null;
  return (
    <section className="section-forms content-block" aria-labelledby="section-forms-title">
      <div className="section-forms__head">
        <span className="section-forms__icon"><Icon name="clipboard-list" size={22} /></span>
        <div>
          <h3 id="section-forms-title" className="section-forms__title">{list.length > 1 ? "Use these forms" : "Use this form"}</h3>
          <p className="section-forms__lead">{list.length > 1 ? "Fill them in on screen as you work, then print or save them as a PDF." : "Fill it in on screen as you work, then print it or save it as a PDF."}</p>
        </div>
      </div>
      <ul className="section-forms__list">
        {list.map((f) => (
          <li key={f._id}>
            <Link className="section-forms__link" to={`/documents/${f.slug}`}>
              <IconBadge name={f.icon || "clipboard-list"} size="sm" />
              <span className="section-forms__text">
                <span className="section-forms__name">{f.title}</span>
                {f.summary && <span className="section-forms__summary">{f.summary}</span>}
              </span>
              <span className="section-forms__go">Open form <Icon name="arrow-right" size={16} /></span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
