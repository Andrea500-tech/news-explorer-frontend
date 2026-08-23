import { useEffect } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../../assets/close.svg";
import "./ModalWithForm.css";

export default function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  redirectText,
  onRedirect,
  isSubmitDisabled = false,
  containerClassName = "",
  isSuccess = false, // new prop to toggle success modal styling
}) {
  // Close modal on 'Escape' key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Close modal when clicking overlay background
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""} ${
        isSuccess ? "modal_success" : ""
      }`}
      onClick={handleOverlayClick}
    >
      {/* Mobile Top Bar (56px strip: Logo left, Close button right) */}
      <header className="modal__mobile-header">
        <Link
          to="/"
          className="modal__mobile-logo"
          onClick={onClose}
          aria-label="Go to homepage"
        >
          NewsExplorer
        </Link>
        <button
          type="button"
          className="modal__close-btn modal__close-btn_mobile"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img
            src={closeIcon}
            alt="Close modal"
            className="modal__close-icon"
          />
        </button>
      </header>

      <div className={`modal__container ${containerClassName}`}>
        {/* Desktop Close Button */}
        <button
          type="button"
          className="modal__close-btn modal__close-btn_desktop"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img
            src={closeIcon}
            alt="Close modal"
            className="modal__close-icon"
          />
        </button>

        <h2 className="modal__title">{title}</h2>

        {onSubmit ? (
          <form className="modal__form" onSubmit={onSubmit} noValidate>
            {children}
            <button
              type="submit"
              className="modal__submit-btn"
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>
          </form>
        ) : (
          children
        )}

        {redirectText && (
          <p className="modal__redirect">
            {onSubmit && "or "}
            <button
              type="button"
              className="modal__redirect-btn"
              onClick={onRedirect}
            >
              {redirectText}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
