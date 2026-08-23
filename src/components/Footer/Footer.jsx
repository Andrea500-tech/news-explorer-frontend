import { Link } from "react-router-dom";
import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/Linkedin.svg";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © {currentYear} SupaNews, Powered by News API
        </p>

        <nav className="footer__nav">
          <div className="footer__links">
            <Link to="/" className="footer__link">
              Home
            </Link>
            <a
              href="https://tripleten.com"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              TripleTen
            </a>
          </div>

          <div className="footer__socials">
            <a
              href="https://github.com/Andrea500-tech"
              target="_blank"
              rel="noreferrer"
              className="footer__social-link"
              aria-label="GitHub"
            >
              <img src={githubIcon} alt="GitHub" className="footer__icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/andrea-kachepa-5ab554274/"
              target="_blank"
              rel="noreferrer"
              className="footer__social-link"
              aria-label="LinkedIn"
            >
              <img src={linkedinIcon} alt="LinkedIn" className="footer__icon" />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
