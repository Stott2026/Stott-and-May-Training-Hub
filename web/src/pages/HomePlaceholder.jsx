import { useState } from "react";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
import IconBadge from "../components/IconBadge.jsx";
import ModuleCard from "../components/ModuleCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import ProgressRing from "../components/ProgressRing.jsx";
import SearchField from "../components/SearchField.jsx";
import SectionBlock from "../components/SectionBlock.jsx";
import ShapeImage from "../components/ShapeImage.jsx";
import Avatar from "../components/Avatar.jsx";
import Wave from "../components/Wave.jsx";
import { sampleModules, samplePeople, sampleSection, sampleValues } from "../placeholderContent.js";
import "./HomePlaceholder.css";

// Step 2 placeholder home page: shows every building block with sample content.
export default function HomePlaceholder({ onOpenModule }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(true);
  const [complete, setComplete] = useState(false);
  const totalSections = sampleModules.reduce((n, m) => n + m.sectionCount, 0);
  const doneSections = sampleModules.reduce((n, m) => n + m.done, 0);
  const overall = (doneSections / totalSections) * 100;

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__pattern" aria-hidden="true" />
        <div className="hero__wave" aria-hidden="true"><Wave variant="glow" /></div>
        <div className="container hero__inner">
          <div className="hero__copy">
            <Eyebrow tone="ink">Stott and May</Eyebrow>
            <h1 id="hero-title" className="hero__title">Training Hub</h1>
            <p className="hero__lead">
              Placeholder introduction. Your complete guide to recruitment excellence across perm, contract and SOW will be written in Sanity.
            </p>
            <div className="hero__actions">
              <SearchField value={search} onChange={setSearch} label="Search the hub" placeholder="Search tactics, phrases, scenarios…" />
              <Button variant="dark" size="lg" icon="brain">Take the quiz</Button>
            </div>
            <div className="hero__social">
              <div className="avatar-stack">
                {samplePeople.avatars.map((src) => <Avatar key={src} src={src} size={44} />)}
              </div>
              <p>Placeholder: learning together across the business</p>
            </div>
          </div>
          <div className="hero__visual">
            <ShapeImage src={samplePeople.hero} shape="squircle" className="hero__person" />
            <div className="float-card float-card--progress" aria-hidden="true">
              <ProgressRing value={overall} size={56} stroke={7} label="Overall progress" />
              <div>
                <p className="float-card__label">Your progress</p>
                <p className="float-card__value">{doneSections} of {totalSections} sections</p>
              </div>
            </div>
            <div className="float-card float-card--badge" aria-hidden="true">
              <IconBadge name="trophy" variant="solid" size="sm" shape="circle" />
              <p className="float-card__value">Module complete!</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container home-stack">
        {/* ── Continue learning ── */}
        <Card className="progress-card">
          <ProgressRing value={overall} size={104} label="Overall progress" />
          <div className="progress-card__body">
            <Eyebrow>Your progress</Eyebrow>
            <h2 className="progress-card__title">Keep the momentum going</h2>
            <ProgressBar value={overall} label={`${doneSections} of ${totalSections} sections complete`} showValue size="md" />
          </div>
          <Button iconAfter="arrow-right" onClick={onOpenModule}>Continue learning</Button>
        </Card>

        {/* ── Values ── */}
        <Card tone="soft" topBar={false} className="values" aria-labelledby="values-title">
          <div className="values__intro">
            <div>
              <Eyebrow>Our philosophy</Eyebrow>
              <h2 id="values-title" className="section-title">The Stott and May Way</h2>
              <p className="section-lead">Placeholder text. The philosophy statement will be edited in Sanity.</p>
              <Wave height={24} />
            </div>
            <ShapeImage src={samplePeople.values} shape="rings" className="values__person" />
          </div>
          <Eyebrow>Our values</Eyebrow>
          <ul className="values__grid">
            {sampleValues.map((v, i) => (
              <li key={v.title}>
                <Card className="value-card" accent={["brand", "sky", "lime", "brand"][i]}>
                  <IconBadge name={v.icon} variant="solid" accent={["brand", "sky", "lime", "brand"][i]} />
                  <h3 className="value-card__title">{v.title}</h3>
                  <p className="value-card__desc">{v.desc}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Card>

        {/* ── Modules ── */}
        <section aria-labelledby="modules-title">
          <div className="section-head">
            <div>
              <Eyebrow>Training modules</Eyebrow>
              <h2 id="modules-title" className="section-title">Pick up where you left off</h2>
            </div>
            <Button variant="secondary" size="sm" icon="compass">Browse by category</Button>
          </div>
          <ul className="module-grid">
            {sampleModules.map((m) => (
              <li key={m.id}><ModuleCard module={m} done={m.done} onOpen={onOpenModule} /></li>
            ))}
          </ul>
        </section>

        {/* ── Component preview, so the building blocks can be reviewed ── */}
        <section aria-labelledby="preview-title" className="preview">
          <Eyebrow tone="muted">Design system preview (removed in step 5)</Eyebrow>
          <h2 id="preview-title" className="section-title">Building blocks</h2>
          <div className="preview__grid">
            <Card>
              <h3 className="preview__label">Buttons</h3>
              <div className="preview__row">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="dark" icon="play">Watch video</Button>
                <Button variant="ghost" iconAfter="arrow-right">Text link</Button>
              </div>
            </Card>
            <Card accent="sky">
              <h3 className="preview__label">Progress</h3>
              <ProgressBar value={72} label="Brand" showValue accent="brand" />
              <div className="preview__gap" />
              <ProgressBar value={45} label="Sky" showValue accent="sky" />
              <div className="preview__gap" />
              <ProgressBar value={88} label="Lime" showValue accent="lime" />
            </Card>
          </div>
          <div className="preview__section">
            <SectionBlock section={sampleSection} number={1} open={open} onToggleOpen={() => setOpen(!open)} completed={complete} onToggleComplete={() => setComplete(!complete)} />
            <SectionBlock section={{ ...sampleSection, title: "A closed section" }} number={2} open={false} onToggleOpen={() => {}} completed={false} onToggleComplete={() => {}} />
          </div>
        </section>
      </div>
    </>
  );
}
