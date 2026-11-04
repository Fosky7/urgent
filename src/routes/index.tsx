import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: WelcomePage,
});

const STATS = [
  { value: "₦18.4m", label: "cleared on verified bills" },
  { value: "1,240", label: "bills verified by reviewers" },
  { value: "3,870", label: "donors swiping weekly" },
] as const;

const STEPS = [
  {
    title: "Browse verified bills",
    body: "Every card is a real household bill — electricity, water, hospital, school fees — checked against a meter or account statement before it appears.",
  },
  {
    title: "See the proof, then swipe",
    body: "Open the proof behind a bill: the biller, the account number, the amount owed and when it was last confirmed. Swipe right to pledge that amount.",
  },
  {
    title: "The biller gets paid directly",
    body: "Your pledge settles the bill with the utility or institution itself. The moment it clears, a receipt lands in your Receipts tab.",
  },
] as const;

/**
 * Landing page for KindSwipe.
 *
 * Delivers the welcome heading, the "How it works" explanation and the two
 * primary entry points: "Browse bills" (the swipe deck) and "Submit a bill"
 * (the bill request form).
 */
export function WelcomePage() {
  return (
    <div className="page">
      <section className="hero" aria-labelledby="welcome-heading">
        <div>
          <span className="eyebrow">Verified bills · Naira only</span>
          <h1 className="hero__title" id="welcome-heading">
            Pay bills for people, one swipe at a time
          </h1>
          <p className="hero__lede">
            KindSwipe turns giving into a reflex. Browse bills that real people
            cannot clear this month, see the proof behind each one, and swipe to
            settle it. Every Naira you send goes straight to the biller —
            never into a wallet of ours.
          </p>
          <div className="hero__actions">
            <Link to="/swipe" className="btn btn--primary">
              Browse bills
            </Link>
            <Link to="/submit" className="btn btn--ghost">
              Submit a bill
            </Link>
          </div>
        </div>

        <aside className="glass-card" aria-label="Example verified bill">
          <div className="bill-card__head">
            <div>
              <p className="bill-card__biller">Ikeja Electric</p>
              <p className="bill-card__account">Meter 0417 2290 118</p>
            </div>
            <span className="badge badge--verified">Verified</span>
          </div>
          <p className="bill-card__amount">₦18,500</p>
          <p className="bill-card__note">
            Two months of arrears. Power was cut on Monday and the children are
            studying with a rechargeable lamp.
          </p>
          <div className="bill-card__foot">
            <span>Proof checked 3 hours ago</span>
            <span className="badge badge--category">Electricity</span>
          </div>
        </aside>
      </section>

      <div className="stats">
        {STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <div className="stat__value">{stat.value}</div>
            <div className="stat__label">{stat.label}</div>
          </div>
        ))}
      </div>

      <section className="section" aria-labelledby="how-it-works">
        <h2 className="section__title" id="how-it-works">
          How it works
        </h2>
        <p className="section__lede">
          KindSwipe is a pay-it-forward app for household bills. People who are
          stuck — a family facing a disconnection notice, a student who cannot
          pay the last instalment of school fees, a patient with an outstanding
          hospital bill — submit their bill. Reviewers confirm it is genuine.
          Then donors like you browse a deck of those verified bills and swipe to
          pledge. Nothing is crowdfunded into a personal account: payments settle
          the biller directly, and every pledge produces a receipt you can keep.
        </p>

        <div className="steps">
          {STEPS.map((step, index) => (
            <article className="step" key={step.title}>
              <div className="step__num" aria-hidden="true">
                {index + 1}
              </div>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__body">{step.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
