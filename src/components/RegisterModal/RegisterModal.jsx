import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onRedirectToLogin,
}) {
  const { values, errors, handleChange, reset } = useForm({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
    reset(); // Clear input fields after submission
  };

  // Check if form is valid
  const isFormValid =
    values.email.trim() !== "" &&
    values.password.trim() !== "" &&
    values.username.trim() !== "" &&
    !errors.email &&
    !errors.password &&
    !errors.username;

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      redirectText="Sign in"
      onRedirect={onRedirectToLogin}
      isSubmitDisabled={!isFormValid} // disable until valid
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>

      <label className="modal__label">
        Username
        <input
          type="text"
          name="username"
          className="modal__input"
          placeholder="Enter your username"
          value={values.username}
          onChange={handleChange}
          required
        />
        {errors.username && (
          <span className="modal__error">{errors.username}</span>
        )}
      </label>
    </ModalWithForm>
  );
}
