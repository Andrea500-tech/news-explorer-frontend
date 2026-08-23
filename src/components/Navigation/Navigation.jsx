import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import logoutIconWhite from "../../assets/logout-white.svg";
import logoutIconDark from "../../assets/logout-dark.svg";
import "./Navigation.css";

export default function Navigation({
  theme = "dark",
  onNavClick, // Optional prop to close mobile drawer on selection
}) {
  const isLight = theme === "light";

  // Consume auth state and handlers directly from context
  const { isLoggedIn, currentUser, handleLogout, handleOpenLogin } =
    useContext(CurrentUserContext);

  const handleLinkClick = () => {
    if (onNavClick) onNavClick();
  };

  return (
    <nav
      className={`navigation ${isLight ? "navigation_theme_light" : ""}`}
      aria-label="Main navigation"
    >
      <ul className="navigation__list">
        <li>
          <NavLink
            to="/"
            end
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""}`
            }
          >
            Home
          </NavLink>
        </li>

        {isLoggedIn && (
          <li>
            <NavLink
              to="/saved-news"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `navigation__link ${isActive ? "navigation__link_active" : ""}`
              }
            >
              Saved articles
            </NavLink>
          </li>
        )}

        <li>
          {isLoggedIn ? (
            <button
              type="button"
              className="navigation__button navigation__button_logout"
              aria-label="Log out of account"
              onClick={() => {
                handleLinkClick();
                handleLogout();
              }}
            >
              <span className="navigation__username">
                {currentUser?.name || "User"}
              </span>
              <img
                src={isLight ? logoutIconDark : logoutIconWhite}
                alt="Log out of account"
                className="navigation__logout-icon"
              />
            </button>
          ) : (
            <button
              type="button"
              className="navigation__button navigation__button_signin"
              aria-label="Sign in to account"
              onClick={() => {
                handleLinkClick();
                handleOpenLogin?.();
              }}
            >
              Sign in
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
