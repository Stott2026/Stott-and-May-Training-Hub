import BlockHeading from "./BlockHeading.jsx";

// A comparison or reference table, e.g. "Order-taker or process owner?".
// Scrolls sideways on its own on narrow screens so the page never does.
export default function InfoTable({ table }) {
  const columns = table.columns ?? [];
  return (
    <section className="content-block">
      {table.title && <BlockHeading icon="list-checks" title={table.title} />}
      <div className="info-table__scroll" tabIndex={0} role="region" aria-label={table.title || "Table"}>
        <table className="info-table">
          <thead>
            <tr>{columns.map((c, i) => <th key={i} scope="col">{c}</th>)}</tr>
          </thead>
          <tbody>
            {(table.rows ?? []).map((r, i) => (
              <tr key={r._key ?? i}>
                {columns.map((_, j) => (j === 0 ? <th key={j} scope="row">{r.cells?.[j]}</th> : <td key={j}>{r.cells?.[j]}</td>))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
