import axios from "axios";

export const fetchNews = async () => {
  try {
    const res = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=c10dd96f15864d83a3d22ed45d47e945`
    );
    return res.data.articles || [];
  } catch (err) {
    console.error("News fetch failed:", err);
    return [];
  }
};
