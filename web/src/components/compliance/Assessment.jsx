import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../Button.jsx";
import Eyebrow from "../Eyebrow.jsx";
import ProgressBar from "../ProgressBar.jsx";
import { Icon } from "../icons.jsx";
import "../module/ModuleContent.css";
import "./Assessment.css";

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// The end-of-course assessment: questions drawn at random from the course's bank, answered one at a
// time (with Back), marked at the end against the pass mark. onFinish({ score, total, percent, passed }).
export default function Assessment({ course, onFinish, onLeave }) {
  const [round, setRound] = useState(0);
  // Each question's answers are shuffled too, and "correct" points at the right one in the new order.
  const questions = useMemo(
    () => shuffle(course.questions ?? []).slice(0, Math.min(course.questionsPerAttempt ?? 10, course.questions?.length ?? 0)).map((qq) => {
      const order = shuffle((qq.options ?? []).map((_, i) => i));
      return { ...qq, options: order.map((i) => qq.options[i]), correct: order.indexOf((qq.correct ?? 1) - 1) + 1 };
    }),
    // A new set each round.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [course._id, round]
  );
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const heading = useRef(null);
  useEffect(() => { heading.current?.focus(); }, [index, result]);

  const q = questions[index];
  const passMark = course.passMark ?? 80;
  const allAnswered = questions.every((_, i) => answers[i] !== undefined);

  const submit = () => {
    const score = questions.filter((qq, i) => answers[i] === (qq.correct ?? 1) - 1).length;
    const percent = Math.round((score / questions.length) * 100);
    const r = { score, total: questions.length, percent, passed: percent >= passMark };
    setResult(r);
    onFinish?.(r);
  };
  const retake = () => { setRound((n) => n + 1); setIndex(0); setAnswers({}); setResult(null); };

  if (result) {
    const wrong = questions.map((qq, i) => ({ qq, i })).filter(({ qq, i }) => answers[i] !== (qq.correct ?? 1) - 1);
    return (
      <section className="assessment" aria-labelledby="assessment-title">
        <div className={`assessment__result ${result.passed ? "is-pass" : "is-fail"}`}>
          <Icon name={result.passed ? "badge-check" : "rotate-ccw"} size={40} />
          <Eyebrow>{result.passed ? "Passed" : "Not passed yet"}</Eyebrow>
          <h2 id="assessment-title" className="assessment__score" tabIndex={-1} ref={heading}>{result.percent}%</h2>
          <p>{result.score} out of {result.total} right. The pass mark is {passMark}%.</p>
          <p className="assessment__verdict">
            {result.passed ? "Well done. Your certificate is ready." : "Have another look at the lessons, then try again. You'll get a new set of questions."}
          </p>
        </div>
        {wrong.length > 0 && (
          <div className="assessment__review">
            <h3>{result.passed ? "Worth another look" : "Where to look again"}</h3>
            <ul>
              {wrong.map(({ qq, i }) => (
                <li key={i}>
                  <p className="assessment__review-q">{qq.question}</p>
                  <p className="assessment__review-a"><Icon name="circle-x" size={16} /> Your answer: {qq.options[answers[i]]}</p>
                  {qq.explanation && <p className="assessment__review-why">{qq.explanation}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="assessment__actions">
          {result.passed ? (
            <Button size="lg" icon="award" onClick={onLeave?.certificate}>See your certificate</Button>
          ) : (
            <Button size="lg" icon="repeat" onClick={retake}>Try again</Button>
          )}
          <Button variant="secondary" onClick={onLeave?.overview}>Back to the course</Button>
        </div>
      </section>
    );
  }

  if (!q) return <p>This course has no assessment questions yet.</p>;
  return (
    <section className="assessment" aria-labelledby="assessment-title">
      <div className="assessment__top">
        <Eyebrow>Final assessment · Question {index + 1} of {questions.length}</Eyebrow>
        <p className="assessment__mark">Pass mark {passMark}%</p>
      </div>
      <ProgressBar value={(Object.keys(answers).length / questions.length) * 100} size="sm" label={`${Object.keys(answers).length} of ${questions.length} answered`} />
      <fieldset className="quick-check__set assessment__set">
        <legend className="assessment__question" tabIndex={-1} ref={heading} id="assessment-title">{q.question}</legend>
        {(q.options ?? []).map((o, i) => (
          <button key={i} type="button" className={`quick-check__option assessment__option ${answers[index] === i ? "is-chosen" : ""}`} aria-pressed={answers[index] === i} onClick={() => setAnswers({ ...answers, [index]: i })}>
            <span className="quick-check__letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
            <span>{o}</span>
            {answers[index] === i && <Icon name="check" size={20} className="quick-check__mark" />}
          </button>
        ))}
      </fieldset>
      <div className="assessment__actions">
        <Button variant="secondary" icon="chevron-left" onClick={() => setIndex(index - 1)} disabled={index === 0}>Back</Button>
        {index + 1 < questions.length ? (
          <Button iconAfter="chevron-right" onClick={() => setIndex(index + 1)} disabled={answers[index] === undefined}>Next question</Button>
        ) : (
          <Button icon="check" onClick={submit} disabled={!allAnswered}>Submit my answers</Button>
        )}
      </div>
      <p className="assessment__note">Your answers are marked when you submit. You can go back and change any answer before then.</p>
    </section>
  );
}
