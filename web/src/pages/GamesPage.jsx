import { Link } from "react-router";
import LoadState from "../components/LoadState.jsx";
import PageHero from "../components/PageHero.jsx";
import { Icon } from "../components/icons.jsx";
import { useApi } from "../lib/api.js";
import { useProgress } from "../lib/progress.jsx";
import { usePageTitle, useSite } from "../lib/site.jsx";
import "../components/accents.css";
import "./Games.css";

// The Games Room (agreed with Ian, November 2026): "challenge May". Every game from the Studio
// (Games), with your best score in each. Each game is played on its own page (GamePage.jsx).
export default function GamesPage() {
  const { data, error } = useApi("/games");
  const { may } = useSite();
  const { games: scores = {} } = useProgress();
  usePageTitle(data ? data.page?.title || "Games Room" : null);
  if (error || !data) return <LoadState error={error} />;
  const page = data.page ?? {};
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title || "Games Room"} titleAccent={page.titleAccent} intro={page.intro} />
      <div className="container games">
        {!may && <p className="games__notice">The games need May, who isn't switched on here yet.</p>}
        <ul className="games__grid">
          {data.games.map((g) => {
            const score = scores[g.slug];
            const open = !g.comingSoon && g.kind === "objection" && g.challenges > 0;
            const body = (
              <>
                <span className="games__tile" aria-hidden="true">
                  <Icon name={g.icon || "target"} size={28} />
                </span>
                <h2 className="games__name">{g.title}</h2>
                <p className="games__tagline">{g.tagline}</p>
                <span className="games__foot">
                  {open ? (
                    <>
                      <span className="games__play">Play <Icon name="arrow-right" size={16} /></span>
                      {score && <span className="games__best">Best {score.best}/{score.total}</span>}
                    </>
                  ) : (
                    <span className="games__soon">Coming soon</span>
                  )}
                </span>
              </>
            );
            return (
              <li key={g._id}>
                {open && may ? (
                  <Link className="games__card games__card--open" data-accent={g.accent || "brand"} to={`/games/${g.slug}`}>{body}</Link>
                ) : (
                  <div className="games__card games__card--soon" data-accent={g.accent || "brand"}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
