import { useState } from "react";
import { validateField } from "../utils/validation";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  function handleChange(evt) {
    const { name, value } = evt.target;

    // Update values
    setValues((prev) => ({ ...prev, [name]: value }));

    // Run validation for this specific field
    const errorMessage = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  }

  // Reset function to clear inputs & error messages
  function reset(newValues = defaultValues) {
    setValues(newValues);
    setErrors({});
  }

  //  check if form is valid
  const isValid =
    Object.values(errors).every((err) => !err) &&
    Object.values(values).every((val) => val.trim() !== "");

  return { values, errors, setValues, handleChange, reset, isValid };
}
