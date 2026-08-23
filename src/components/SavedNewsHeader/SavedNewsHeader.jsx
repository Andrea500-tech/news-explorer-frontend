import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SavedNewsHeader.css";

export default function SavedNewsHeader({ savedArticles = [] }) {
  // Consume current user directly from context
  const { currentUser } = useContext(CurrentUserContext);
  const username = currentUser?.name || "Elise";

  const savedArticlesCount = savedArticles.length;

  // Calculates frequency and formats top keywords
  const renderKeywords = () => {
    if (savedArticlesCount === 0) return null;

    // 1. Count frequency of each keyword
    const keywordCounts = {};
    savedArticles.forEach((article) => {
      const keyword = article.keyword;
      if (keyword) {
        // Normalize casing to avoid duplicates like "Nature" vs "nature"
        const formattedKeyword =
          keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase();
        keywordCounts[formattedKeyword] =
          (keywordCounts[formattedKeyword] || 0) + 1;
      }
    });

    // 2. Sort unique keywords by frequency (highest first)
    const sortedKeywords = Object.keys(keywordCounts).sort(
      (a, b) => keywordCounts[b] - keywordCounts[a],
    );

    const length = sortedKeywords.length;

    // 3. Format keywords according to design rules
    if (length === 1) {
      return <b>{sortedKeywords[0]}</b>;
    }
    if (length === 2) {
      return (
        <>
          <b>{sortedKeywords[0]}</b> and <b>{sortedKeywords[1]}</b>
        </>
      );
    }
    if (length === 3) {
      return (
        <>
          <b>{sortedKeywords[0]}</b>, <b>{sortedKeywords[1]}</b>, and{" "}
          <b>{sortedKeywords[2]}</b>
        </>
      );
    }

    // 4 or more keywords -> "Key1, Key2, and X other"
    return (
      <>
        <b>{sortedKeywords[0]}</b>, <b>{sortedKeywords[1]}</b>, and{" "}
        <b>{length - 2} other</b>
      </>
    );
  };

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__subtitle">Saved articles</p>
        <h1 className="saved-news-header__title">
          {username}, you have {savedArticlesCount}{" "}
          {savedArticlesCount === 1 ? "saved article" : "saved articles"}
        </h1>
        {savedArticlesCount > 0 && (
          <p className="saved-news-header__keywords">
            By keywords: {renderKeywords()}
          </p>
        )}
      </div>
    </section>
  );
}
