import Button from "../Button.jsx";
import Logo from "../Logo.jsx";
import { Icon } from "../icons.jsx";
import { addMonths, longDate } from "../../lib/compliance.jsx";
import { useHubName } from "../../lib/site.jsx";
import "./Certificate.css";

// A certificate for a passed course, ready to print or save as a PDF. Until records are kept on
// the server, it says plainly that it is a practice record.
export default function Certificate({ course, pass, name }) {
  const renewBy = addMonths(pass.date, course.renewMonths ?? 12);
  const { fullName } = useHubName();
  return (
    <div className="certificate-wrap">
      <article className="certificate" aria-labelledby="certificate-title">
        <div className="certificate__band" aria-hidden="true" />
        <div className="certificate__top">
          <Logo size={44} />
          <span className="certificate__org">{fullName}</span>
        </div>
        <p className="certificate__eyebrow">Certificate of completion</p>
        <p className="certificate__lead">This is to confirm that</p>
        <p className="certificate__name">{name || "Your name"}</p>
        <p className="certificate__lead">has completed and passed</p>
        <h2 id="certificate-title" className="certificate__course">{course.title}</h2>
        <dl className="certificate__facts">
          <div><dt>Passed on</dt><dd>{longDate(pass.date)}</dd></div>
          <div><dt>Score</dt><dd>{pass.percent}% (pass mark {course.passMark ?? 80}%)</dd></div>
          <div><dt>Renew by</dt><dd>{longDate(renewBy)}</dd></div>
        </dl>
        <p className="certificate__note">
          <Icon name="triangle-alert" size={16} /> Practice record: kept in this browser only, not yet an official company training record.
        </p>
      </article>
      <div className="certificate-actions">
        <Button icon="printer" onClick={() => window.print()}>Print or save as PDF</Button>
      </div>
    </div>
  );
}
