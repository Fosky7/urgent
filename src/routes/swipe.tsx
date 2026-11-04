import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/swipe")({
  component: SwipeBillsPage,
});

interface SampleBill {
  id: string;
  biller: string;
  account: string;
  amount: number;
  category: string;
  note: string;
  checked: string;
}

/** Sample of the verified bills currently in the review-cleared queue. */
const SAMPLE_BILLS: SampleBill[] = [
  {
    id: "iks-2290",
    biller: "Ikeja Electric",
    account: "Meter 0417 2290 118",
    amount: 18500,
    category: "Electricity",
    note: "Two months of arrears. Power was cut on Monday and the children are studying with a rechargeable lamp.",
    checked: "Checked 3 hours ago",
  },
  {
    id: "lwc-7714",
    biller: "Lagos Water Corporation",
    account: "Account 2210 7714",
    amount: 9200,
    category: "Water",
    note: "Supply was disconnected in June. The compound of six flats shares one metered line.",
    checked: "Checked yesterday",
  },
  {
    id: "lgh-4412",
    biller: "Lagoon Hospitals",
    account: "Invoice 88-4412",
    amount: 74000,
    category: "Hospital",
    note: "Balance left after a three-day admission for malaria and dehydration. Discharge papers attached.",
    checked: "Checked 6 hours ago",
  },
  {
    id: "unilag-3391",
    biller: "University of Lagos",
    account: "Matric 1904 3391",
    amount: 128000,
    category: "School fees",
    note: "Final instalment for a 300-level student. Portal shows a hold on results until it clears.",
    checked: "Checked 2 days ago",
  },
];

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

/**
 * Swipe bills browse page (Module 1).
 *
 * Read-only preview of the verified queue: it lists the bills reviewers have
 * already cleared so a donor can see what is waiting. Swipe gestures, pledging
 * and receipt creation belong to later modules and are intentionally absent.
 */
export function SwipeBillsPage() {
  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Verified queue</span>
        <h1 className="page-title">Swipe bills</h1>
        <p className="page-lede">
          These are real bills that reviewers have already checked against a
          meter reading, an account statement or a hospital invoice. Read the
          story, look at the proof, and pledge whatever you can clear — the
          money goes to the biller, not to the person who submitted it.
        </p>
      </header>

      {SAMPLE_BILLS.length === 0 ? (
        <div className="empty">
          <p className="empty__title">Nothing waiting for a pledge</p>
          <p className="empty__body">
            Every verified bill in the queue has been fully covered. New bills
            appear here as soon as reviewers finish checking them.
          </p>
          <Link to="/swipe" className="btn btn--primary">
            Browse bills
          </Link>
        </div>
      ) : (
        <section
          className="bill-grid"
          aria-label="Verified bills waiting for a pledge"
        >
          {SAMPLE_BILLS.map((bill) => (
            <article className="bill-card" key={bill.id}>
              <div className="bill-card__head">
                <div>
                  <h2 className="bill-card__biller">{bill.biller}</h2>
                  <p className="bill-card__account">{bill.account}</p>
                </div>
                <span className="badge badge--verified">Verified</span>
              </div>
              <p className="bill-card__amount">{naira.format(bill.amount)}</p>
              <p className="bill-card__note">{bill.note}</p>
              <div className="bill-card__foot">
                <span>{bill.checked}</span>
                <span className="badge badge--category">{bill.category}</span>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

export default SwipeBillsPage;
