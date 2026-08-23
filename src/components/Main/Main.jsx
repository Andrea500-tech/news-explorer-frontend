import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import "./Main.css";

export default function Main({
  onSearch,
  isLoading,
  isNotFound,
  hasSearched,
  articles,
  hasMoreArticles,
  onShowMore,
  savedArticles,
  onSaveArticle,
  onDeleteArticle,
}) {
  // Consume isLoggedIn and sign-in handler directly from context
  const { isLoggedIn, handleOpenLogin } = useContext(CurrentUserContext);

  return (
    <main className="main">
      {/* Hero Search Banner */}
      <section className="hero">
        <div className="hero__container">
          <h1 className="hero__title">What's going on in the world?</h1>
          <p className="hero__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSearch={onSearch} />
        </div>
      </section>

      {/* 1. Preloader Component */}
      {isLoading && <Preloader />}

      {/* 2. Nothing Found Component */}
      {!isLoading && isNotFound && <NotFound />}

      {/* 3. Search Results Grid */}
      {!isLoading && hasSearched && articles.length > 0 && (
        <NewsCardList
          articles={articles}
          isLoggedIn={isLoggedIn}
          savedArticles={savedArticles}
          onSaveArticle={onSaveArticle}
          onDeleteArticle={onDeleteArticle}
          hasMoreArticles={hasMoreArticles}
          onShowMore={onShowMore}
          onSigninClick={handleOpenLogin}
        />
      )}

      {/* Author Section */}
      <About />
    </main>
  );
}
