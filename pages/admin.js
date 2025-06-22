import { useEffect, useState } from "react";
import Navbar from './components/Navbar';
import { fetchNews } from "./utils/fetchNews";
import PayoutTable from "./components/PayoutTable";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function AdminPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn") === "true";
    const role = Cookies.get("role");

    if (!isLoggedIn || role !== "admin") {
      router.push("/login");
    } else {
      fetchNews().then(data => {
        setArticles(data);
        setLoading(false);
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-7xl mx-auto bg-white text-black min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Admin - Payout Dashboard</h1>
        {loading ? (
          <p className="text-gray-500">Loading articles...</p>
        ) : (
          <PayoutTable articles={articles} />
        )}
      </main>
    </>
  );
}
