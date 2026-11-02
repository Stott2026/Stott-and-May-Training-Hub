import { useEffect } from "react";
import LoadState from "../components/LoadState.jsx";
import PageHero from "../components/PageHero.jsx";
import StartHerePath, { usePathProgress } from "../components/StartHerePath.jsx";
import ValuesCard from "../components/ValuesCard.jsx";
import Button from "../components/Button.jsx";
import { useApi } from "../lib/api.js";
import { placeholderPhotos } from "../lib/placeholderPhotos.js";
import "./StartPage.css";

// "New to the desk": the Start here path and The Stott and May Way, in one place for new starters.
// The words come from Sanity (Start here path, Home page and Company values).
export default function StartPage() {
  const home = useApi("/home");
  const values = useApi("/values");
  const path = usePathProgress(home.data?.startHere);
  useEffect(() => { document.title = "New to the desk · Stott and May Training Hub"; }, []);
  const error = home.error || values.error;
  if (error || !home.data || !values.data) return <LoadState error={error} />;
  const { startHere, philosophyTitle, philosophyText } = home.data;

  return (
    <>
      <PageHero eyebrow="New to the desk?" title={startHere?.title || "Start here"} intro={startHere?.intro} photo={placeholderPhotos.start} photoShape="frame">
        {path.nextModule && (
          <Button size="lg" iconAfter="arrow-right" to={`/modules/${path.nextModule.slug}`}>
            {path.finishedCount === 0 ? `Start with ${path.nextModule.title}` : `Continue ${path.nextModule.title}`}
          </Button>
        )}
      </PageHero>
      <div className="container start-page">
        {startHere && <StartHerePath path={startHere} heading={false} />}
        <ValuesCard title={philosophyTitle} text={philosophyText} values={values.data} />
      </div>
    </>
  );
}
