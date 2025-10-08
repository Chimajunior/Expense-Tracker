import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";

export default function Header() {
  const { token, logout } = useAuth();

  return (
    <header className="bg-white border-b border-brand-gray shadow-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Brand / Logo */}
        <Link to="/" className="font-bold text-brand-red text-lg tracking-tight">
          Wise<span className="text-brand-ink">Track</span>
        </Link>

        {/* Navigation Links */}
        <nav className="ml-auto flex items-center gap-3">
          {token ? (
            <>
              <Link to="/" className="text-sm hover:text-brand-red">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="btn text-sm px-3 py-1"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:text-brand-red">
                Login
              </Link>
              <Link to="/register" className="text-sm hover:text-brand-red">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
