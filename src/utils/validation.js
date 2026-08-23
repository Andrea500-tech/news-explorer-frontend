export function validateField(name, value) {
  // Required check
  if (!value || value.trim() === "") {
    return "This field is required.";
  }

  // Email validation
  if (name === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address.";
    }
  }

  // Password validation
  if (name === "password") {
    if (value.length < 6) {
      return "Password must be at least 6 characters.";
    }
  }

  // Username validation
  if (name === "username") {
    if (value.length < 2) {
      return "Username must be at least 2 characters.";
    }
  }

  // No error
  return "";
}
