import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

import menuWhite from "../../assets/hamburger/menu-white.svg";
import menuDark from "../../assets/hamburger/menu-dark.svg";
import closeIcon from "../../assets/close.svg";

export default function Header({ theme = "dark" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLight = theme === "light";

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const getMenuIcon = () =>
    isMenuOpen ? closeIcon : isLight ? menuDark : menuWhite;

  return (
    <header className={`header ${isLight ? "header_theme_light" : ""}`}>
      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo" onClick={closeMenu}>
          NewsExplorer
        </Link>

        {/* Mobile Hamburger / Close Button */}
        <button
          type="button"
          className="header__hamburger"
          onClick={toggleMenu}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          <img
            src={getMenuIcon()}
            alt={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="header__hamburger-icon"
          />
        </button>

        {/* Navigation & Mobile Drawer */}
        <nav
          className={`header__nav-wrapper ${
            isMenuOpen ? "header__nav-wrapper_open" : ""
          }`}
        >
          <Navigation theme={theme} onNavClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
}
