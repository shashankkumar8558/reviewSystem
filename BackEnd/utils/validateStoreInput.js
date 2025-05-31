export const validateStoreInput = ({ storeName, storeAddress, storeEmail }) => {
  const errors = [];

  if (!storeName || storeName.length < 20 || storeName.length > 60) {
    errors.push("Store name must be between 20 and 60 characters.");
  }

  if (!storeAddress || storeAddress.length > 400) {
    errors.push("Store address cannot exceed 400 characters.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!storeEmail || !emailRegex.test(storeEmail)) {
    errors.push("Valid store email is required.");
  }

  return errors;
};
