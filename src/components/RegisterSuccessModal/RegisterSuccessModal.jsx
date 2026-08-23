import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterSuccessModal({
  isOpen,
  onClose,
  onRedirectToLogin,
  
}) {
  return (
    <ModalWithForm
      title="Registration successfully completed!"
      isOpen={isOpen}
      onClose={onClose}
      containerClassName="modal__container_type_success"
      isSuccess={true}
    >
      <p className="modal__redirect">
        <button
          type="button"
          className="modal__redirect-btn"
          onClick={onRedirectToLogin}
        >
          Sign in
        </button>
      </p>
    </ModalWithForm>
  );
}
