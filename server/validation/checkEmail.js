const Validator = require("validator");
const ifEmpty = require("./checkForEmpty");

module.exports = function validateResetInput(data) {
  let errors = {};

  try {
    // Ensure the email field exists or default it to an empty string
    data.email = !ifEmpty(data.email) ? data.email : "";

    // Validate: email must not be empty
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email is required";
    }

    // Validate: email must be in a valid email format
    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  } catch (err) {
    // If there's an error during validation, log it and return a generic error message
    console.error("Validation error in validateResetInput:", err);
    errors.email = "Error processing your email validation.";
  }

  // Return the results of the validation
  return {
    errors,
    isValid: ifEmpty(errors) // Check if the errors object is empty
  };
};
