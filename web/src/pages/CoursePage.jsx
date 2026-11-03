import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Button from "../components/Button.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
import LoadState from "../components/LoadState.jsx";
import PageHero from "../components/PageHero.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import Assessment from "../components/compliance/Assessment.jsx";
import Certificate from "../components/compliance/Certificate.jsx";
import LessonBlocks, { INTERACTIVE } from "../components/compliance/LessonBlocks.jsx";
import { Icon } from "../components/icons.jsx";
import { useApi } from "../lib/api.js";
import { REGIONS, STATUS_LABELS, longDate, useCompliance } from "../lib/compliance.jsx";
import "./Compliance.css";

// One compliance course. /compliance/:slug is the overview; /compliance/:slug/1 (and so on) a lesson;
// /compliance/:slug/assessment the final assessment; /compliance/:slug/certificate the certificate.
// Lessons open in order: each one once the one before is complete.
export default function CoursePage() {
  const { slug, step } = useParams();
  const { data: course, error } = useApi(`/compliance/${slug}`);
  const { data: me } = useApi("/me");
  const c = useCompliance();
  const navigate = useNavigate();
  useEffect(() => { if (course?.title) document.title = `${course.title} · Compliance · Stott and May Training Hub`; }, [course?.title]);
  if (error || !course) return <LoadState error={error} notFoundText="Course not found" />;

  const lessons = course.lessons ?? [];
  const doneCount = c.lessonsDone(slug, lessons.map((l) => l._key));
  const allDone = doneCount === lessons.length;
  const firstOpen = lessons.findIndex((l) => !c.isLessonDone(slug, l._key));
  const unlocked = (i) => i === 0 || c.isLessonDone(slug, lessons[i - 1]._key);
  const pass = c.lastPass(slug);
  const status = c.status({ ...course, lessonKeys: lessons.map((l) => l._key) });
  const base = `/compliance/${slug}`;

  const header = (
    <div className="course-bar">
      {/* Lessons, the assessment and the certificate show their own headings, under the course name. */}
      {step && <h1 className="visually-hidden">{course.title}</h1>}
      <div className="container course-bar__inner">
        <Link to={step ? base : "/compliance"} className="course-bar__back"><Icon name="arrow-left" size={18} /> {step ? "Course overview" : "All courses"}</Link>
        {step && <span className="course-bar__title">{course.title}</span>}
        <span className="course-bar__progress">{doneCount} of {lessons.length} lessons</span>
      </div>
    </div>
  );
  const draft = !course.approved && (
    <p className="course-draft"><Icon name="file-text" size={16} /> Draft for review: this course is waiting for sign-off by HR and Compliance.</p>
  );

  // A lesson
  const n = Number(step);
  if (Number.isInteger(n) && n >= 1 && n <= lessons.length) {
    const i = n - 1;
    if (!unlocked(i)) return <>{header}<Locked text="Finish the lessons before this one first." to={`${base}/${firstOpen + 1}`} label={`Go to lesson ${firstOpen + 1}`} /></>;
    return (
      <>
        {header}
        <div className="container course-layout">
          <LessonList lessons={lessons} slug={slug} current={i} unlocked={unlocked} base={base} allDone={allDone} />
          <Lesson
            key={lessons[i]._key}
            course={course}
            lesson={lessons[i]}
            index={i}
            total={lessons.length}
            done={c.isLessonDone(slug, lessons[i]._key)}
            onComplete={() => c.completeLesson(slug, lessons[i]._key)}
            onNext={() => navigate(i + 1 < lessons.length ? `${base}/${i + 2}` : `${base}/assessment`)}
            onPrevious={() => navigate(i > 0 ? `${base}/${i}` : base)}
            draft={draft}
          />
        </div>
      </>
    );
  }

  if (step === "assessment") {
    if (!allDone) return <>{header}<Locked text="The assessment opens once every lesson is complete." to={`${base}/${firstOpen + 1}`} label={`Go to lesson ${firstOpen + 1}`} /></>;
    return (
      <>
        {header}
        <div className="container course-single">
          <Assessment
            course={course}
            onFinish={(r) => c.addAttempt(slug, r)}
            onLeave={{ certificate: () => navigate(`${base}/certificate`), overview: () => navigate(base) }}
          />
        </div>
      </>
    );
  }

  if (step === "certificate") {
    if (!pass) return <>{header}<Locked text="Your certificate appears here once you've passed the assessment." to={base} label="Back to the course" /></>;
    return <>{header}<div className="container course-single"><Certificate course={course} pass={pass} name={me?.name} /></div></>;
  }

  // The overview
  const next = !allDone ? `${base}/${firstOpen + 1}` : pass ? `${base}/certificate` : `${base}/assessment`;
  const nextLabel = doneCount === 0 ? "Start the course" : !allDone ? `Continue: lesson ${firstOpen + 1}` : pass ? "See your certificate" : "Take the assessment";
  return (
    <>
      <PageHero eyebrow={`Compliance · ${REGIONS[course.region] ?? "Global"}`} tone="light" title={course.title} intro={course.intro || course.summary}>
        <ul className="stat-tiles">
          <li className="stat-tile"><span className="stat-tile__number">{lessons.length}</span><span className="stat-tile__label">lessons</span></li>
          <li className="stat-tile"><span className="stat-tile__number">{course.minutes}</span><span className="stat-tile__label">minutes, about</span></li>
          <li className="stat-tile"><span className="stat-tile__number">{course.passMark ?? 80}%</span><span className="stat-tile__label">to pass</span></li>
        </ul>
        <div className="course-hero__actions">
          <Button size="lg" iconAfter="arrow-right" to={next}>{nextLabel}</Button>
          <span className={`course-status course-status--${status.id}`}>{STATUS_LABELS[status.id]}{status.due && ` · renew by ${longDate(status.due)}`}</span>
        </div>
      </PageHero>
      <div className="container course-overview">
        {draft}
        <div className="course-overview__grid">
          <section className="course-panel" aria-labelledby="course-lessons">
            <Eyebrow>{doneCount} of {lessons.length} complete</Eyebrow>
            <h2 id="course-lessons" className="course-panel__title">Lessons</h2>
            <ProgressBar value={(doneCount / Math.max(1, lessons.length)) * 100} size="sm" label="Course progress" />
            <ol className="course-lessons">
              {lessons.map((l, i) => {
                const done = c.isLessonDone(slug, l._key);
                const open = unlocked(i);
                return (
                  <li key={l._key} className={done ? "is-done" : open ? "is-open" : "is-locked"}>
                    <span className="course-lessons__n" aria-hidden="true">{done ? <Icon name="check" size={16} /> : open ? i + 1 : <Icon name="lock" size={14} />}</span>
                    <div>
                      {open ? <Link to={`${base}/${i + 1}`} className="course-lessons__title">{l.title}</Link> : <span className="course-lessons__title">{l.title}</span>}
                      {l.summary && <p className="course-lessons__summary">{l.summary}</p>}
                    </div>
                    <span className="visually-hidden">{done ? "Complete" : open ? "Open" : "Locked"}</span>
                  </li>
                );
              })}
              <li className={allDone ? (pass ? "is-done" : "is-open") : "is-locked"}>
                <span className="course-lessons__n" aria-hidden="true">{pass ? <Icon name="check" size={16} /> : allDone ? <Icon name="target" size={16} /> : <Icon name="lock" size={14} />}</span>
                <div>
                  {allDone ? <Link to={`${base}/assessment`} className="course-lessons__title">Final assessment</Link> : <span className="course-lessons__title">Final assessment</span>}
                  <p className="course-lessons__summary">{course.questionsPerAttempt ?? 10} questions drawn at random. Pass mark {course.passMark ?? 80}%. You can retake it.</p>
                </div>
              </li>
            </ol>
          </section>
          <aside className="course-side">
            {course.outcomes?.length > 0 && (
              <section className="course-panel" aria-labelledby="course-outcomes">
                <h2 id="course-outcomes" className="course-panel__title">By the end you'll be able to</h2>
                <ul className="course-outcomes">{course.outcomes.map((o, i) => <li key={i}><Icon name="circle-check" size={18} /> {o}</li>)}</ul>
              </section>
            )}
            {pass && (
              <section className="course-panel course-panel--pass">
                <h2 className="course-panel__title">Passed with {pass.percent}%</h2>
                <p>On {longDate(pass.date)}. Renew every {course.renewMonths ?? 12} months.</p>
                <Button variant="secondary" icon="award" to={`${base}/certificate`}>Your certificate</Button>
              </section>
            )}
          </aside>
        </div>
        {course.sources?.length > 0 && (
          <section className="course-sources" aria-labelledby="course-sources">
            <h2 id="course-sources" className="course-panel__title">Sources and further reading</h2>
            <ul>
              {course.sources.map((s) => (
                <li key={s._key ?? s.title}>{s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} <Icon name="external-link" size={14} /><span className="visually-hidden"> (opens in a new tab)</span></a> : s.title}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}

function Locked({ text, to, label }) {
  return (
    <div className="container course-single">
      <div className="course-locked">
        <Icon name="lock" size={28} />
        <p>{text}</p>
        <Button to={to}>{label}</Button>
      </div>
    </div>
  );
}

function LessonList({ lessons, slug, current, unlocked, base, allDone }) {
  const c = useCompliance();
  return (
    <nav className="course-nav" aria-label="Lessons">
      <ol>
        {lessons.map((l, i) => {
          const done = c.isLessonDone(slug, l._key);
          const cls = `course-nav__item ${i === current ? "is-current" : ""} ${done ? "is-done" : ""}`;
          const inner = <><span className="course-nav__n" aria-hidden="true">{done ? <Icon name="check" size={14} /> : unlocked(i) ? i + 1 : <Icon name="lock" size={12} />}</span><span className="course-nav__title">{l.title}</span></>;
          return (
            <li key={l._key}>
              {unlocked(i) ? <Link to={`${base}/${i + 1}`} className={cls} aria-current={i === current ? "step" : undefined}>{inner}</Link> : <span className={`${cls} is-locked`}>{inner}</span>}
            </li>
          );
        })}
        <li>
          {allDone ? (
            <Link to={`${base}/assessment`} className="course-nav__item"><span className="course-nav__n" aria-hidden="true"><Icon name="target" size={14} /></span><span className="course-nav__title">Final assessment</span></Link>
          ) : (
            <span className="course-nav__item is-locked"><span className="course-nav__n" aria-hidden="true"><Icon name="lock" size={12} /></span><span className="course-nav__title">Final assessment</span></span>
          )}
        </li>
      </ol>
    </nav>
  );
}

function Lesson({ lesson, index, total, done, onComplete, onNext, onPrevious, draft }) {
  // Which interactive parts the learner has finished in this visit. Coming back to a completed
  // lesson doesn't make them do it all again.
  const [finished, setFinished] = useState({});
  const heading = useRef(null);
  useEffect(() => { heading.current?.focus(); }, []);
  const interactive = (lesson.blocks ?? []).filter((b) => INTERACTIVE.includes(b._type));
  const left = done ? 0 : interactive.filter((b) => !finished[b._key]).length;
  const isLast = index === total - 1;
  return (
    <article className="lesson" aria-labelledby="lesson-title">
      <header className="lesson__header">
        <Eyebrow>Lesson {index + 1} of {total}</Eyebrow>
        <h2 id="lesson-title" className="lesson__title" tabIndex={-1} ref={heading}>{lesson.title}</h2>
        {lesson.summary && <p className="lesson__summary">{lesson.summary}</p>}
        {draft}
      </header>
      <LessonBlocks blocks={lesson.blocks} lessonKey={lesson._key} doneKeys={done ? Object.fromEntries(interactive.map((b) => [b._key, true])) : finished} onBlockDone={(key) => setFinished((f) => ({ ...f, [key]: true }))} />
      <footer className="lesson__footer">
        <Button variant="secondary" icon="chevron-left" onClick={onPrevious}>{index === 0 ? "Overview" : "Previous"}</Button>
        {done ? (
          <Button variant="dark" iconAfter="chevron-right" onClick={onNext}>{isLast ? "Go to the assessment" : "Next lesson"}</Button>
        ) : (
          <div className="lesson__complete">
            {left > 0 && <p className="lesson__left" role="status">Finish the {left === 1 ? "interactive part" : `${left} interactive parts`} above to complete this lesson.</p>}
            <Button size="lg" icon="check" disabled={left > 0} onClick={() => { onComplete(); onNext(); }}>{isLast ? "Complete and go to the assessment" : "Complete and continue"}</Button>
          </div>
        )}
      </footer>
    </article>
  );
}
