import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[80vh] bg-brand-gray">
      <h1 className="text-3xl font-bold text-brand-ink mb-4">
        Take Control of Your Finances
      </h1>
      <p className="text-slate-600 max-w-md mb-6">
        Track income, monitor expenses, and visualize your spending — all in one simple dashboard.
      </p>

      <div className="flex gap-4">
        <Link to="/register" className="btn">Get Started</Link>
        <Link
          to="/login"
          className="border border-brand-red text-brand-red px-4 py-2 rounded-md hover:bg-brand-red hover:text-white transition"
        >
          Login
        </Link>
      </div>

      <img
        src="https://illustrations.popsy.co/gray/piggy-bank.svg"
        alt="Piggy bank illustration"
        className="mt-10 w-64 opacity-80"
      />
    </section>
  );
}
