export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // Minimum 8 characters, at least one letter and one number
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
};

export const getValidationErrorMessage = (field, value) => {
  if (field === "email") {
    if (!value) return "Email is required";
    if (!validateEmail(value)) return "Invalid email format";
  }
  if (field === "password") {
    if (!value) return "Password is required";
    if (!validatePassword(value)) {
      return "Password must be at least 8 characters long and contain both letters and numbers";
    }
  }
  if (field === "username") {
    if (!value) return "Username is required";
    if (value.length < 3) return "Username must be at least 3 characters long";
  }
  return null;
};
