import { useState } from "react";
import "./NewsCard.css";

import bookmarkLightIcon from "../../assets/bookmark/bookmark-light.svg";
import bookmarkDarkIcon from "../../assets/bookmark/bookmark-dark.svg";
import bookmarkFilledIcon from "../../assets/bookmark/bookmark-filled.svg";
import trashLightIcon from "../../assets/trashicon/trash-light.svg";
import trashDarkIcon from "../../assets/trashicon/trash-dark.svg";

export default function NewsCard({
  card,
  isLoggedIn,
  isSavedNews = false,
  savedArticles = [],
  onSaveArticle,
  onDeleteArticle,
  onSigninClick,
}) {
  const [isHovered, setIsHovered] = useState(false);

  //  Derive saved status from global savedArticles using _id only
  const isSaved = savedArticles.some((article) => article._id === card._id);

  const handleButtonClick = (e) => {
    e.stopPropagation();

    if (!isLoggedIn && !isSavedNews) {
      if (onSigninClick) onSigninClick();
      return;
    }

    const articleIdentifier = card._id;

    if (isSavedNews) {
      onDeleteArticle(articleIdentifier);
    } else {
      if (isSaved) {
        onDeleteArticle(articleIdentifier);
      } else {
        onSaveArticle(card);
      }
    }
  };

  const getCurrentIcon = () => {
    if (isSavedNews) {
      return isHovered ? trashDarkIcon : trashLightIcon;
    }
    return isSaved
      ? bookmarkFilledIcon
      : isHovered
        ? bookmarkDarkIcon
        : bookmarkLightIcon;
  };

  const formattedDate =
    card.date ||
    new Date(card.publishedAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <li className="news-card">
      {isSavedNews && card.keyword && (
        <div className="news-card__keyword">{card.keyword}</div>
      )}

      <button
        type="button"
        className={`news-card__button ${
          isSavedNews
            ? "news-card__button_delete"
            : isSaved
              ? "news-card__button_save news-card__button_saved"
              : "news-card__button_save"
        }`}
        onClick={handleButtonClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={isSavedNews ? "Delete article" : "Save article"}
      >
        <img
          src={getCurrentIcon()}
          alt={isSavedNews ? "Delete icon" : "Bookmark icon"}
          className="news-card__icon"
        />
      </button>

      {!isSavedNews && (
        <div className="news-card__tooltip">
          {isLoggedIn ? "Save an article" : "Sign in to save articles"}
        </div>
      )}
      {isSavedNews && (
        <div className="news-card__tooltip">Remove from saved</div>
      )}

      <a
        href={card.link}
        target="_blank"
        rel="noreferrer"
        className="news-card__link"
      >
        <img src={card.image} alt={card.title} className="news-card__image" />
        <div className="news-card__content">
          <p className="news-card__date">{formattedDate}</p>
          <h3 className="news-card__title">{card.title}</h3>
          <p className="news-card__text">{card.text}</p>
          <p className="news-card__source">{card.source}</p>
        </div>
      </a>
    </li>
  );
}
