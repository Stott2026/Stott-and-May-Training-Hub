import Button from "./Button.jsx";
import "./LoadState.css";

// Shown while content loads from the server, or if it couldn't be loaded.
export default function LoadState({ error, notFoundText = "We couldn't find that page." }) {
  if (!error) {
    return <p className="load-state" role="status">Loading…</p>;
  }
  return (
    <div className="load-state" role="alert">
      <h1 className="load-state__title">{error.status === 404 ? notFoundText : "Something went wrong"}</h1>
      <p>{error.status === 404 ? "It may have been moved or renamed." : error.message}</p>
      <Button to="/" iconAfter="arrow-right">Back to the hub</Button>
    </div>
  );
}
