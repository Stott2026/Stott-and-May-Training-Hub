import { useEffect } from "react";
import LoadState from "../components/LoadState.jsx";
import PageHero from "../components/PageHero.jsx";
import AchievementsCard from "../components/AchievementsCard.jsx";
import { useAchievements } from "../lib/achievements.jsx";
import { placeholderPhotos } from "../lib/placeholderPhotos.js";
import "./StartPage.css";

// Your achievements: level, points, streak and every badge. Opened from the chip in the top bar.
export default function AchievementsPage() {
  const a = useAchievements();
  useEffect(() => { document.title = "Your achievements · Stott and May Training Hub"; }, []);
  if (!a.enabled) return <LoadState error={{ status: 404 }} notFoundText="Badges and levels aren't switched on yet" />;
  return (
    <>
      <PageHero eyebrow="Stott and May" title={a.title || "Your achievements"} intro={a.intro} photo={placeholderPhotos.values} />
      <div className="container start-page">
        <AchievementsCard />
      </div>
    </>
  );
}
