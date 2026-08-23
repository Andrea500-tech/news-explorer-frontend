import "./Preloader.css";

export default function Preloader() {
  return (
    <section className="preloader">
      <div className="circle-preloader" />
      <p className="preloader__text">Searching for news...</p>
    </section>
  );
}
