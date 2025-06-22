import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Custom tooltip component for clear black text
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 p-3 rounded shadow text-sm">
        <p className="font-semibold text-black">{label}</p>
        <p className="text-black">Articles: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function ChartAnalytics({ articles }) {
  // Group articles by author
  const authorMap = {};

  articles.forEach((article) => {
    const author = article.author || "Unknown";
    authorMap[author] = (authorMap[author] || 0) + 1;
  });

  const chartData = Object.entries(authorMap).map(([author, count]) => ({
    name: author,
    count,
  }));

  return (
    <div className="bg-white rounded-xl p-6 shadow mb-10">
      <h2 className="text-xl font-bold mb-4 text-black">
        Articles per Author
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="count" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
