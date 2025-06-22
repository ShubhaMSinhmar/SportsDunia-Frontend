import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loginStatus = Cookies.get("isLoggedIn") === "true";
    const userRole = Cookies.get("role") || "";
    setIsLoggedIn(loginStatus);
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    Cookies.remove("isLoggedIn");
    Cookies.remove("role");
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-indigo-600"
        >
          NewsDash
        </Link>

        {/* Desktop Menu */}
        <div className="md:flex items-center gap-6 hidden">
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="hover:text-indigo-600 text-gray-700 font-medium"
              >
                Dashboard
              </Link>
              {role === "admin" && (
                <Link
                  href="/admin"
                  className="hover:text-indigo-600 text-gray-700 font-medium"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-md"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-white px-6 pb-4 border-t border-gray-200 flex flex-col gap-3`}
        >
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="hover:text-indigo-600 text-gray-700 font-medium"
              >
                Dashboard
              </Link>
              {role === "admin" && (
                <Link
                  href="/admin"
                  className="hover:text-indigo-600 text-gray-700 font-medium"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-red-500 text-left font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-indigo-600 text-white text-center px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
