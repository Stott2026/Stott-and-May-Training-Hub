import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
import IconBadge from "../components/IconBadge.jsx";
import LoadState from "../components/LoadState.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { Icon } from "../components/icons.jsx";
import { useApi } from "../lib/api.js";
import { useProgress } from "../lib/progress.jsx";
import "../components/module/ModuleContent.css";
import "./QuizPage.css";

const QUESTIONS_PER_ROUND = 10;

// The hub quiz: ten questions picked at random from the question bank in Sanity.
export default function QuizPage() {
  const { data, error } = useApi("/quiz");
  const [round, setRound] = useState(0);
  if (error || !data) return <LoadState error={error} />;
  if (data.length === 0) return <LoadState error={{ message: "There are no quiz questions yet." }} />;
  return <QuizRound key={round} bank={data} onRestart={() => setRound((r) => r + 1)} />;
}

function QuizRound({ bank, onRestart }) {
  const questions = useMemo(() => shuffle(bank).slice(0, QUESTIONS_PER_ROUND), [bank]);
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const { addQuizScore } = useProgress();
  const headingRef = useRef(null);
  useEffect(() => { headingRef.current?.focus(); }, [index, finished]);

  const q = questions[index];
  const answered = chosen !== null;
  const choose = (i) => {
    if (answered) return;
    setChosen(i);
    if (i === q.correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setChosen(null);
    } else {
      addQuizScore(score, questions.length);
      setFinished(true);
    }
  };

  if (finished) {
    const ratio = score / questions.length;
    return (
      <div className="container quiz">
        <Card className="quiz__card quiz__result">
          <IconBadge name={ratio >= 0.8 ? "trophy" : ratio >= 0.6 ? "badge-check" : "book-open"} size="lg" variant="solid" shape="circle" />
          <Eyebrow>Quiz complete</Eyebrow>
          <h1 className="quiz__score" tabIndex={-1} ref={headingRef}>{score} out of {questions.length}</h1>
          <p className="quiz__verdict">
            {ratio >= 0.8 ? "Excellent. You really know your stuff." : ratio >= 0.6 ? "Good effort. Review the modules and try again." : "Keep learning. Go back through the training modules."}
          </p>
          <div className="quiz__actions">
            <Button to="/" iconAfter="arrow-right">Back to the hub</Button>
            <Button variant="secondary" icon="brain" onClick={onRestart}>Try another round</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container quiz">
      <Card className="quiz__card">
        <div className="quiz__top">
          <Eyebrow>Question {index + 1} of {questions.length}</Eyebrow>
          <Button variant="ghost" size="sm" icon="x" to="/">Leave the quiz</Button>
        </div>
        <ProgressBar value={(index / questions.length) * 100} size="sm" label="Quiz progress" />
        <fieldset className="quick-check__set quiz__set">
          <legend className="quiz__question" tabIndex={-1} ref={headingRef}>{q.question}</legend>
          {q.options.map((o, i) => {
            const state = !answered ? "" : i === q.correct ? "is-correct" : i === chosen ? "is-wrong" : "is-dim";
            return (
              <button key={i} type="button" className={`quick-check__option ${state}`} onClick={() => choose(i)} aria-disabled={answered}>
                <span className="quick-check__letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                <span>{o}</span>
                {answered && i === q.correct && <Icon name="circle-check" size={20} className="quick-check__mark" />}
                {answered && i === chosen && i !== q.correct && <Icon name="circle-x" size={20} className="quick-check__mark" />}
              </button>
            );
          })}
        </fieldset>
        {answered && (
          <div className={`quick-check__feedback ${chosen === q.correct ? "is-right" : "is-wrong"}`} role="status">
            <p className="quick-check__verdict">{chosen === q.correct ? "Spot on." : "Not quite."}</p>
            <p>{q.explanation}</p>
          </div>
        )}
        {answered && (
          <div className="quiz__actions">
            <Button iconAfter="arrow-right" onClick={next}>{index + 1 < questions.length ? "Next question" : "See your score"}</Button>
          </div>
        )}
      </Card>
    </div>
  );
}

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
