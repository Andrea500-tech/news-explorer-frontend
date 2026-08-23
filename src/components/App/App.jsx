import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import RegisterSuccessModal from "../RegisterSuccessModal/RegisterSuccessModal";

import { getNews } from "../../utils/NewsApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const navigate = useNavigate();

  // Modal & Auth State
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser] = useState({ name: "Elise" });

  // News Search States
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  // Saved Articles State
  const [savedArticles, setSavedArticles] = useState([]);

  // Modal Handlers
  const handleOpenLogin = () => setActiveModal("login");
  const handleOpenRegister = () => setActiveModal("register");
  const handleCloseModal = () => setActiveModal("");

  // Auth Handlers
  const handleRegister = (values) => {
    console.log("Registration submitted:", values);
    setActiveModal("success");
  };

  const handleLogin = (values) => {
    console.log("Login submitted:", values);
    setIsLoggedIn(true);
    handleCloseModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  // Search News API Handler
  const handleSearch = (keyword) => {
    setIsLoading(true);
    setIsNotFound(false);
    setIsSearchError(false);
    setHasSearched(true);
    setVisibleCount(3);

    getNews(keyword)
      .then((formattedArticles) => {
        if (!formattedArticles || formattedArticles.length === 0) {
          setIsNotFound(true);
          setArticles([]);
        } else {
          setArticles(formattedArticles);
        }
      })
      .catch((err) => {
        console.error("News API Error:", err);
        setIsSearchError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  //  Save Handler: prevents duplicates using _id
  const handleSaveArticle = (article) => {
    setSavedArticles((prev) =>
      prev.some((a) => a._id === article._id) ? prev : [...prev, article],
    );
  };

  //  Delete Handler: matches by _id
  const handleDeleteArticle = (articleIdentifier) => {
    setSavedArticles((prev) =>
      prev.filter((item) => item._id !== articleIdentifier),
    );
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, handleLogout, handleOpenLogin }}
    >
      <div className="page">
        <div className="page__content">
          <Routes>
            {/* Main Home Route ("/") */}
            <Route
              path="/"
              element={
                <>
                  <Header theme="dark" />
                  <Main
                    onSearch={handleSearch}
                    isLoading={isLoading}
                    isNotFound={isNotFound}
                    isSearchError={isSearchError}
                    hasSearched={hasSearched}
                    articles={articles.slice(0, visibleCount)}
                    hasMoreArticles={visibleCount < articles.length}
                    onShowMore={handleShowMore}
                    savedArticles={savedArticles}
                    onSaveArticle={handleSaveArticle}
                    onDeleteArticle={handleDeleteArticle}
                  />
                </>
              }
            />

            {/* Protected Saved News Route ("/saved-news") */}
            <Route
              path="/saved-news"
              element={
                isLoggedIn ? (
                  <>
                    <Header theme="light" />
                    <SavedNewsHeader savedArticles={savedArticles} />
                    <main className="saved-news">
                      <div className="saved-news__container">
                        <NewsCardList
                          articles={savedArticles}
                          isLoggedIn={isLoggedIn}
                          isSavedNews={true}
                          savedArticles={savedArticles}
                          onDeleteArticle={handleDeleteArticle}
                        />
                      </div>
                    </main>
                  </>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>

          <Footer />

          {/* Modals */}
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={handleCloseModal}
            onLogin={handleLogin}
            onRedirectToRegister={handleOpenRegister}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={handleCloseModal}
            onRegister={handleRegister}
            onRedirectToLogin={handleOpenLogin}
          />

          <RegisterSuccessModal
            isOpen={activeModal === "success"}
            onClose={handleCloseModal}
            onRedirectToLogin={handleOpenLogin}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
