import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "./lib/auth";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  const { token, logout } = useAuth();
  const loc = useLocation();

  return (
    <div className="min-h-screen bg-brand-gray text-brand-ink">
      <Header />

      <main className="max-w-5xl mx-auto p-4">
        <Outlet key={loc.key} />
      </main>

      <Footer />
    </div>
  );
}
