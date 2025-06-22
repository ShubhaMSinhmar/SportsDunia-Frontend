import { useEffect, useState } from "react";
import { fetchNews } from "./utils/fetchNews";
import Navbar from "./components/Navbar";
import ArticleCard from "./components/ArticleCard";
import ChartAnalytics from "./components/ChartAnalytics";

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [authorFilter, setAuthorFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNews().then((data) => {
      setArticles(data);
      setFilteredArticles(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let filtered = articles;

    if (authorFilter) {
      filtered = filtered.filter(
        (a) =>
          a.author &&
          a.author.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(
        (a) =>
          a.source.name &&
          a.source.name.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }

    if (dateFrom) {
      filtered = filtered.filter((a) => {
        const articleDate = new Date(a.publishedAt).toISOString().split("T")[0];
        return articleDate >= dateFrom;
      });
    }

    if (dateTo) {
      filtered = filtered.filter((a) => {
        const articleDate = new Date(a.publishedAt).toISOString().split("T")[0];
        return articleDate <= dateTo;
      });
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title?.toLowerCase().includes(term) ||
          a.description?.toLowerCase().includes(term)
      );
    }

    setFilteredArticles(filtered);
  }, [authorFilter, typeFilter, dateFrom, dateTo, searchTerm, articles]);

  const uniqueAuthors = [
    ...new Set(articles.map((a) => a.author).filter(Boolean)),
  ];
  const uniqueSources = [
    ...new Set(articles.map((a) => a.source.name).filter(Boolean)),
  ];

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-7xl mx-auto bg-white text-black">
        <h1 className="text-2xl font-bold mb-6">Tesla News Dashboard</h1>

        {/* 🔍 Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            className="p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border border-gray-300 rounded"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          >
            <option value="">All Authors</option>
            {uniqueAuthors.map((author, i) => (
              <option key={i} value={author}>
                {author}
              </option>
            ))}
          </select>
          <select
            className="p-2 border border-gray-300 rounded"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Sources</option>
            {uniqueSources.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        {/* 🔁 Articles Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <p className="text-gray-500 text-center">
            No articles match your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, idx) => (
              <ArticleCard key={idx} article={article} />
            ))}
          </div>
        )}

        <ChartAnalytics articles={articles} />
      </main>
    </>
  );
}
