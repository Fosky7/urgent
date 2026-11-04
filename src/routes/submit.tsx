import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/submit")({
  component: SubmitBillPage,
});

const CATEGORIES = [
  "Electricity",
  "Water",
  "Hospital",
  "School fees",
  "Internet",
  "Rent",
  "Other",
] as const;

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

interface FormValues {
  biller: string;
  accountNumber: string;
  amount: string;
  category: string;
  note: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_FORM: FormValues = {
  biller: "",
  accountNumber: "",
  amount: "",
  category: "",
  note: "",
};

const MIN_AMOUNT = 500;
const MAX_AMOUNT = 5_000_000;

/** Pure validation so the rules stay testable and readable. */
function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.biller.trim()) {
    errors.biller = "Enter the biller or institution name.";
  }

  if (!/^[0-9A-Za-z /-]{4,28}$/.test(values.accountNumber.trim())) {
    errors.accountNumber = "Enter 4–28 letters, numbers, spaces or dashes.";
  }

  const amount = Number(values.amount.replace(/,/g, ""));
  if (!values.amount.trim()) {
    errors.amount = "Enter the amount owed in Naira.";
  } else if (!Number.isFinite(amount)) {
    errors.amount = "Enter the amount as a number, e.g. 18500.";
  } else if (amount < MIN_AMOUNT) {
    errors.amount = `Minimum amount is ${naira.format(MIN_AMOUNT)}.`;
  } else if (amount > MAX_AMOUNT) {
    errors.amount = `Maximum amount is ${naira.format(MAX_AMOUNT)}.`;
  }

  if (!values.category) {
    errors.category = "Pick the closest category.";
  }

  if (values.note.trim().length < 20) {
    errors.note = "Add at least 20 characters so a reviewer can verify the bill.";
  }

  return errors;
}

export function SubmitBillPage() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  function update<K extends keyof FormValues>(key: K, value: string) {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) =>
      previous[key] ? { ...previous, [key]: undefined } : previous,
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(values);
  }

  function resetForm() {
    setValues(EMPTY_FORM);
    setErrors({});
    setSubmitted(null);
  }

  return (
    <div className="page page--narrow">
      <header className="page-head">
        <span className="eyebrow">Two minutes to file</span>
        <h1 className="page-title">Submit a bill request</h1>
        <p className="page-lede">
          Tell us which bill needs clearing and attach the details exactly as
          they appear on the biller's statement. A reviewer checks every request
          against the biller before it reaches the deck — so precise details
          get verified much faster.
        </p>
      </header>

      {submitted ? (
        <section className="notice" aria-live="polite">
          <h2 className="notice__title">Bill request captured</h2>
          <p className="notice__body">
            Here is what you filed. A reviewer will check these details against
            the biller and, once verified, the bill enters the swipe queue.
          </p>
          <div className="summary">
            <div className="summary__item">
              <div className="summary__label">Biller</div>
              <div className="summary__value">{submitted.biller}</div>
            </div>
            <div className="summary__item">
              <div className="summary__label">Account / meter</div>
              <div className="summary__value">{submitted.accountNumber}</div>
            </div>
            <div className="summary__item">
              <div className="summary__label">Amount</div>
              <div className="summary__value">
                {naira.format(Number(submitted.amount.replace(/,/g, "")) || 0)}
              </div>
            </div>
            <div className="summary__item">
              <div className="summary__label">Category</div>
              <div className="summary__value">{submitted.category}</div>
            </div>
          </div>
          <div className="form-actions">
            <Link to="/swipe" className="btn btn--primary">
              Browse bills
            </Link>
            <button type="button" className="btn btn--ghost" onClick={resetForm}>
              Submit another bill
            </button>
          </div>
        </section>
      ) : (
        <form className="form-card" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="field">
              <label className="label" htmlFor="biller">
                Biller or institution
              </label>
              <input
                id="biller"
                name="biller"
                className={`input${errors.biller ? " input--error" : ""}`}
                placeholder="Ikeja Electric"
                value={values.biller}
                onChange={(event) => update("biller", event.target.value)}
                aria-invalid={Boolean(errors.biller)}
                aria-describedby={errors.biller ? "biller-error" : undefined}
                autoComplete="organization"
              />
              {errors.biller ? (
                <p className="error" id="biller-error" role="alert">
                  {errors.biller}
                </p>
              ) : null}
            </div>

            <div className="field">
              <label className="label" htmlFor="accountNumber">
                Account or meter number
              </label>
              <input
                id="accountNumber"
                name="accountNumber"
                className={`input${errors.accountNumber ? " input--error" : ""}`}
                placeholder="0417 2290 118"
                value={values.accountNumber}
                onChange={(event) => update("accountNumber", event.target.value)}
                aria-invalid={Boolean(errors.accountNumber)}
                aria-describedby={
                  errors.accountNumber ? "account-error" : undefined
                }
                autoComplete="off"
              />
              {errors.accountNumber ? (
                <p className="error" id="account-error" role="alert">
                  {errors.accountNumber}
                </p>
              ) : (
                <p className="hint">Copy it exactly as printed on the bill.</p>
              )}
            </div>

            <div className="field">
              <label className="label" htmlFor="amount">
                Amount owed (₦)
              </label>
              <input
                id="amount"
                name="amount"
                inputMode="numeric"
                className={`input${errors.amount ? " input--error" : ""}`}
                placeholder="18500"
                value={values.amount}
                onChange={(event) => update("amount", event.target.value)}
                aria-invalid={Boolean(errors.amount)}
                aria-describedby={errors.amount ? "amount-error" : undefined}
              />
              {errors.amount ? (
                <p className="error" id="amount-error" role="alert">
                  {errors.amount}
                </p>
              ) : (
                <p className="hint">Naira only — no foreign currency bills.</p>
              )}
            </div>

            <div className="field">
              <label className="label" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                className={`select${errors.category ? " select--error" : ""}`}
                value={values.category}
                onChange={(event) => update("category", event.target.value)}
                aria-invalid={Boolean(errors.category)}
                aria-describedby={errors.category ? "category-error" : undefined}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category ? (
                <p className="error" id="category-error" role="alert">
                  {errors.category}
                </p>
              ) : null}
            </div>

            <div className="field field--full">
              <label className="label" htmlFor="note">
                What is happening with this bill?
              </label>
              <textarea
                id="note"
                name="note"
                className={`textarea${errors.note ? " textarea--error" : ""}`}
                placeholder="Two months of arrears. Power was cut on Monday and the children are studying with a rechargeable lamp."
                value={values.note}
                onChange={(event) => update("note", event.target.value)}
                aria-invalid={Boolean(errors.note)}
                aria-describedby={errors.note ? "note-error" : "note-hint"}
              />
              {errors.note ? (
                <p className="error" id="note-error" role="alert">
                  {errors.note}
                </p>
              ) : (
                <p className="hint" id="note-hint">
                  Keep it factual. Reviewers cannot verify emotional appeals
                  alone.
                </p>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn--primary">
              Submit bill request
            </button>
            <Link to="/swipe" className="btn btn--ghost">
              Browse bills instead
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
