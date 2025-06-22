import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Navbar from "./components/Navbar";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const loggedIn = Cookies.get("isLoggedIn") === "true";
    const userRole = Cookies.get("role");

    setIsLoggedIn(loggedIn);
    setRole(userRole);
    setLoading(false);

    if (loggedIn) {
      router.replace(userRole === "admin" ? "/admin" : "/dashboard");
    }
  }, []);

  if (loading) return null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gray-50">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 tracking-tight">
          Welcome to <span className="text-indigo-600">NewsDash</span> 📊
        </h1>
        <p className="text-gray-600 mb-8 max-w-xl leading-relaxed text-lg">
          Your all-in-one dashboard to track articles, manage payouts, and visualize analytics — all in one clean interface.
        </p>

        <button
          onClick={() => router.push("/login")}
          className="bg-black text-white px-6 py-3 rounded-md font-medium shadow-sm hover:shadow-md transition"
        >
          Login to Get Started
        </button>
      </main>
    </>
  );
}
