import Eyebrow from "../Eyebrow.jsx";
import Button from "../Button.jsx";
import TacticChecklist from "./TacticChecklist.jsx";
import PhraseList from "./PhraseList.jsx";
import MistakeCards from "./MistakeCards.jsx";
import ScenarioChallenge from "./ScenarioChallenge.jsx";
import QuickCheck from "./QuickCheck.jsx";
import "./ModuleContent.css";

// One section of a module, shown on its own so the learner can focus on it.
export default function SectionView({ section, index, total, completed, avatar, onComplete, onPrevious, onNext }) {
  const isLast = index === total - 1;
  return (
    <article className="section-view" aria-labelledby="section-title">
      <header className="section-view__header">
        <Eyebrow>Section {index + 1} of {total}</Eyebrow>
        <h2 id="section-title" className="section-view__title">{section.title}</h2>
        {section.takeaway && <p className="section-view__takeaway">{section.takeaway}</p>}
        <p className="section-view__intro">{section.content}</p>
        {section.image?.url && <img className="section-view__image" src={`${section.image.url}?w=1200&auto=format`} alt={section.image.alt || ""} />}
      </header>

      {/* Phase 2: a video player goes here when the section has a video. */}
      {section.tactics?.length > 0 && <TacticChecklist key={`t${index}`} tactics={section.tactics} />}
      {section.phrases?.length > 0 && <PhraseList phrases={section.phrases} avatar={avatar} />}
      {section.mistakes?.length > 0 && <MistakeCards mistakes={section.mistakes} />}
      {section.scenario && <ScenarioChallenge key={`s${index}`} scenario={section.scenario} />}
      {section.quiz && <QuickCheck key={`q${index}`} question={section.quiz} />}

      <footer className="section-view__footer">
        <Button variant="secondary" icon="chevron-left" onClick={onPrevious} disabled={index === 0}>Previous</Button>
        {completed ? (
          <Button variant="dark" iconAfter="chevron-right" onClick={onNext}>{isLast ? "Finish" : "Next section"}</Button>
        ) : (
          <Button size="lg" icon="check" onClick={onComplete}>{isLast ? "Complete the module" : "Complete and continue"}</Button>
        )}
      </footer>
    </article>
  );
}
