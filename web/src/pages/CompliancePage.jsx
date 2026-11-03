import { useEffect } from "react";
import { Link } from "react-router";
import Card from "../components/Card.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
import IconBadge from "../components/IconBadge.jsx";
import LoadState from "../components/LoadState.jsx";
import PageHero from "../components/PageHero.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { Icon } from "../components/icons.jsx";
import { useApi } from "../lib/api.js";
import { CATEGORIES, REGIONS, STATUS_LABELS, longDate, useCompliance } from "../lib/compliance.jsx";
import "./Compliance.css";

const STATUS_ICONS = { "not-started": "circle-user", "in-progress": "clock", ready: "list-checks", passed: "badge-check", due: "triangle-alert" };

// Compliance: the company's mandatory courses, grouped by category, each with your status.
export default function CompliancePage() {
  const { data, error } = useApi("/compliance");
  const c = useCompliance();
  useEffect(() => { document.title = "Compliance · Stott and May Training Hub"; }, []);
  if (error || !data) return <LoadState error={error} />;

  const courses = data.courses ?? [];
  const page = data.page ?? {};
  const statuses = Object.fromEntries(courses.map((course) => [course.slug, c.status(course)]));
  const passed = courses.filter((course) => statuses[course.slug].id === "passed").length;
  const toDo = courses.length - passed;
  const groups = CATEGORIES.map((cat) => ({ ...cat, courses: courses.filter((course) => course.category === cat.value) }))
    .concat([{ value: "other", title: "Other courses", courses: courses.filter((course) => !CATEGORIES.some((cat) => cat.value === course.category)) }])
    .filter((g) => g.courses.length);

  return (
    <>
      <PageHero eyebrow="Mandatory training" tone="light" title={page.title || "Compliance"} titleAccent={page.titleAccent} intro={page.intro}>
        {courses.length > 0 && (
          <ul className="stat-tiles">
            <li className="stat-tile"><span className="stat-tile__number">{courses.length}</span><span className="stat-tile__label">{courses.length === 1 ? "course" : "courses"}</span></li>
            <li className="stat-tile"><span className="stat-tile__number">{passed}</span><span className="stat-tile__label">passed</span></li>
            <li className="stat-tile"><span className="stat-tile__number">{toDo}</span><span className="stat-tile__label">to do or renew</span></li>
          </ul>
        )}
      </PageHero>

      <div className="container compliance-stack">
        <p className="compliance-practice"><Icon name="triangle-alert" size={16} /> For now, your progress and results are saved in this browser only. They aren't yet an official company training record.</p>
        {!courses.length && <p className="compliance-empty">No courses yet. They appear here once they're published in the Studio.</p>}
        {groups.map((g) => (
          <section key={g.value} aria-labelledby={`cc-group-${g.value}`}>
            <Eyebrow>{g.courses.length} {g.courses.length === 1 ? "course" : "courses"}</Eyebrow>
            <h2 id={`cc-group-${g.value}`} className="compliance-group__title">{g.title}</h2>
            <ul className="compliance-grid">
              {g.courses.map((course) => {
                const st = statuses[course.slug];
                const done = c.lessonsDone(course.slug, course.lessonKeys);
                return (
                  <li key={course._id}>
                    <Card as={Link} to={`/compliance/${course.slug}`} interactive accent={course.accent || "brand"} className="course-card">
                      <div className="course-card__top">
                        <IconBadge name={course.icon || "shield-check"} variant="soft" />
                        <span className="course-chip"><Icon name="globe" size={14} /> {REGIONS[course.region] ?? "Global"}</span>
                      </div>
                      <h3 className="course-card__title">{course.title}</h3>
                      <p className="course-card__summary">{course.summary}</p>
                      <p className="course-card__meta">
                        <span><Icon name="clock" size={14} /> About {course.minutes} min</span>
                        <span><Icon name="book-open" size={14} /> {course.lessonCount} lessons</span>
                        <span><Icon name="target" size={14} /> Pass {course.passMark ?? 80}%</span>
                      </p>
                      {!course.approved && <p className="course-chip course-chip--draft"><Icon name="file-text" size={14} /> Draft for review</p>}
                      <div className="course-card__status">
                        <span className={`course-status course-status--${st.id}`}><Icon name={STATUS_ICONS[st.id]} size={14} /> {STATUS_LABELS[st.id]}{st.due && ` · renew by ${longDate(st.due)}`}</span>
                        {st.id !== "passed" && st.id !== "due" && <ProgressBar value={(done / Math.max(1, course.lessonCount)) * 100} size="sm" label={`${done} of ${course.lessonCount} lessons`} accent={course.accent || "brand"} />}
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        {page.note && <p className="compliance-note">{page.note}</p>}
      </div>
    </>
  );
}
