import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

export default function NewsCardList({
  articles,
  isLoggedIn,
  savedArticles,
  onSaveArticle,
  onDeleteArticle,
  hasMoreArticles,
  onShowMore,
  onSigninClick,
  isSavedNews = false,
}) {
  return (
    <section className="cards">
      <h2 className="cards__title">Search results</h2>
      <ul className="cards__list">
        {articles.map((article, index) => (
          <NewsCard
            key={article.url || article._id || index}
            card={article}
            isLoggedIn={isLoggedIn}
            savedArticles={savedArticles}
            onSaveArticle={onSaveArticle}
            onDeleteArticle={onDeleteArticle}
            onSigninClick={onSigninClick}
            isSavedNews={isSavedNews} 
          />
        ))}
      </ul>
      {hasMoreArticles && (
        <button type="button" className="cards__button" onClick={onShowMore}>
          Show more
        </button>
      )}
    </section>
  );
}
