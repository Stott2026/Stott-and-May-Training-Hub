import LoadState from "../components/LoadState.jsx";
import PageHero from "../components/PageHero.jsx";
import AchievementsCard from "../components/AchievementsCard.jsx";
import { useAchievements } from "../lib/achievements.jsx";
import { placeholderPhotos } from "../lib/placeholderPhotos.js";
import "./StartPage.css";
import { usePageTitle } from "../lib/site.jsx";

// Your achievements: level, points, streak and every badge. Opened from the chip in the top bar.
// A dark "trophy cabinet" (the brand's dark mode, as on the Technology tab).
export default function AchievementsPage() {
  const a = useAchievements();
  usePageTitle("Your achievements");
  if (!a.enabled) return <LoadState error={{ status: 404 }} notFoundText="Badges and levels aren't switched on yet" />;
  const earned = a.badges.filter((b) => b.earned).length;
  return (
    <div className="theme-dark achievements-page" data-theme="dark">
      <PageHero
        eyebrow="Stott and May"
        title={<>{a.title || "Your achievements"}<span className="headline-accent">Level {a.levelIndex + 1}: {a.level.title}</span></>}
        intro={a.intro}
        photo={placeholderPhotos.achievements}
        photoShape="rings"
        decoration={<div className="brand-shapes" aria-hidden="true"><span /><span /><span /><span /></div>}
      >
        <ul className="stat-tiles">
          <li className="stat-tile"><span className="stat-tile__number">{a.points.toLocaleString("en-GB")}</span><span className="stat-tile__label">points</span></li>
          <li className="stat-tile"><span className="stat-tile__number">{earned}<small>/{a.badges.length}</small></span><span className="stat-tile__label">badges earned</span></li>
          <li className="stat-tile"><span className="stat-tile__number">{a.streak}</span><span className="stat-tile__label">day streak</span></li>
        </ul>
      </PageHero>
      <div className="container start-page">
        <AchievementsCard />
      </div>
    </div>
  );
}
