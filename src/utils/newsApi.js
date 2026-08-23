import { LOOKBACK_DAYS, PAGE_SIZE, FALLBACK_IMAGE } from "./constants";

const BASE_URL = "https://nomoreparties.co/news/v2/everything";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY; // pulled from .env

// Helper function to format date to "Month DD, YYYY"
const formatDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getNews = (keyword) => {
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - LOOKBACK_DAYS);

  const to = currentDate.toISOString();
  const from = pastDate.toISOString();

  return fetch(
    `${BASE_URL}?q=${encodeURIComponent(keyword)}&apiKey=${API_KEY}&from=${from}&to=${to}&pageSize=${PAGE_SIZE}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
    .then(checkResponse)
    .then((data) => {
      if (!data.articles) return [];

      return data.articles.map((item, index) => ({
        _id: item.url || `${keyword}-${index}-${item.publishedAt}`,
        keyword,
        title: item.title || "Untitled",
        text: item.description || item.content || "No description available.",
        date: formatDate(item.publishedAt),
        source: item.source?.name || "Unknown Source",
        link: item.url,
        image: item.urlToImage || FALLBACK_IMAGE,
      }));
    })
    .catch((err) => {
      console.error("getNews error:", err);
      throw err;
    });
};
