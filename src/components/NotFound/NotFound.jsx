import "./NotFound.css";
import notFoundIcon from "../../assets/not-found_v1.svg"; 

export default function NotFound() {
  return (
    <section className="not-found">
      <img
        src={notFoundIcon}
        alt="Nothing found icon"
        className="not-found__image"
      />
      <h2 className="not-found__title">Nothing found</h2>
      <p className="not-found__text">
        Sorry, but nothing matched your search terms.
      </p>
    </section>
  );
}
