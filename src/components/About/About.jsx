import "./About.css";
import authorAvatar from "../../assets/avatar.jpg";

export default function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__image-container">
          <img
            src={authorAvatar}
            alt="Author avatar"
            className="about__avatar"
          />
        </div>
        <div className="about__content">
          <h2 className="about__title">About the author</h2>
          <p className="about__description">
            Hello! I'm Andrea Kachepa, a full-stack web developer. I focus on
            building responsive, user-friendly web applications using React,
            JavaScript, Node.js, Express, and MongoDB.
          </p>
          <p className="about__description">
            This project was developed as part of TripleTen's Software
            Engineering Program, designed to practice full-stack integration,
            state management, RESTful APIs, and pixel-perfect design
            implementation according to Figma specifications.
          </p>
        </div>
      </div>
    </section>
  );
}
