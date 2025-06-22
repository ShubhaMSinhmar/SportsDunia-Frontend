import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

export default function PayoutTable({ articles }) {
  const [payouts, setPayouts] = useState({});

  // Count articles by author
  const authorMap = {};
  articles.forEach((article) => {
    const author = article.author || "Unknown";
    authorMap[author] = (authorMap[author] || 0) + 1;
  });

  const authorData = Object.entries(authorMap).map(([author, count]) => ({
    author,
    count,
    rate: payouts[author]?.rate || 10, // default ₹10/article
  }));

  useEffect(() => {
    const stored = localStorage.getItem("payoutRates");
    if (stored) {
      setPayouts(JSON.parse(stored));
    }
  }, []);

  const updateRate = (author, newRate) => {
    const updated = {
      ...payouts,
      [author]: { rate: parseFloat(newRate) || 0 },
    };
    setPayouts(updated);
    localStorage.setItem("payoutRates", JSON.stringify(updated));
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Payout Report", 14, 16);

    const tableData = authorData.map(({ author, count, rate }) => [
      author,
      count,
      rate,
      (rate * count).toFixed(2),
    ]);

    autoTable(doc, {
      startY: 20,
      head: [["Author", "Articles", "Rate (₹)", "Total (₹)"]],
      body: tableData,
    });

    doc.save("payout-report.pdf");
  };

  const csvData = authorData.map(({ author, count, rate }) => ({
    Author: author,
    Articles: count,
    Rate: rate,
    Total: (rate * count).toFixed(2),
  }));

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow-md transition-all">
      <h2 className="text-xl font-bold mb-6">Payout Summary</h2>

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={exportPDF}
          className="bg-black text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition"
        >
          Export PDF
        </button>

        <CSVLink
          data={csvData}
          filename={"payout-report.csv"}
          className="bg-gray-800 text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition"
        >
          Export CSV
        </CSVLink>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-md border border-gray-200">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="px-4 py-3 font-semibold">Author</th>
              <th className="px-4 py-3 font-semibold">Articles</th>
              <th className="px-4 py-3 font-semibold">Rate (₹)</th>
              <th className="px-4 py-3 font-semibold">Total Payout (₹)</th>
            </tr>
          </thead>
          <tbody>
            {authorData.map(({ author, count, rate }, i) => (
              <tr
                key={i}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium">{author}</td>
                <td className="px-4 py-3">{count}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={rate}
                    className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) => updateRate(author, e.target.value)}
                  />
                </td>
                <td className="px-4 py-3 font-semibold text-green-600">
                  ₹{(rate * count).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
