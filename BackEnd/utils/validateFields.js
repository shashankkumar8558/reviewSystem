export const validateUserInput = ({ userName, email, password }) => {
  const errors = [];

  if (!userName || userName.trim().length === 0) {
    errors.push("User name is required.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Valid email is required.");
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
  if (!password || !passwordRegex.test(password)) {
    errors.push("Password must be 8-16 chars, with at least one uppercase and one special character.");
  }

/*   const allowedRoles = ['USER', 'OWNER', 'ADMIN'];
  if (!role || !allowedRoles.includes(role)) {
    errors.push("Role must be one of USER, OWNER, or ADMIN.");
  } */

  return errors;
};
