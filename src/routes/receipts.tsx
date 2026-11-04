import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/receipts")({
  component: ReceiptsPage,
});

/**
 * `/receipts` — the giving record.
 *
 * Rendered inside the root layout, so the navigation bar (with its active
 * "Receipts" link) stays visible while this page is open.
 */
export function ReceiptsPage() {
  return (
    <main className="page page--narrow">
      <header className="page-head">
        <span className="eyebrow">Your giving record</span>
        <h1 className="page-title">Receipts</h1>
        <p className="page-lede">
          Every pledge you make produces a receipt the moment the bill is cleared
          with the biller — the amount, the biller, the reference number and the
          date. Keep them for your records or share them with whoever matches
          your giving.
        </p>
      </header>

      <section className="empty" aria-labelledby="receipts-empty-title">
        <div className="empty__icon" aria-hidden="true">
          ₦
        </div>
        <h2 className="empty__title" id="receipts-empty-title">
          No receipts yet
        </h2>
        <p className="empty__body">
          You have not pledged to a bill yet, so there is nothing to file here.
          Once you clear a bill, its receipt appears on this page immediately.
        </p>
        <div className="hero__actions" style={{ justifyContent: "center" }}>
          <Link to="/swipe" className="btn btn--primary">
            Browse bills
          </Link>
          <Link to="/submit" className="btn btn--ghost">
            Submit a bill
          </Link>
        </div>
      </section>

      <section className="surface-card" aria-labelledby="receipts-detail-title">
        <h2 className="section__title" id="receipts-detail-title">
          What each receipt will show
        </h2>
        <ul className="checklist">
          <li>The biller and account that your pledge settled directly.</li>
          <li>The pledged amount, in Naira, with no processing markup added.</li>
          <li>A payment reference the biller can trace back to you.</li>
          <li>The date the bill was confirmed cleared, down to the minute.</li>
        </ul>
      </section>
    </main>
  );
}
