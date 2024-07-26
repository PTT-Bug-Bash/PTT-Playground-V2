// // Import validator and custom function with TypeScript syntax
// import Validator from "validator";
// import ifEmpty from "./checkForEmpty";

// // Define an interface for the input data structure
// interface RegistrationData {
//   email: string;
//   password1: string;
//   password2: string; // Make sure to include this property
//   first_name: string;
//   last_name: string;
// }

// // Define an interface for the errors structure
// interface RegistrationErrors {
//   email?: string;
//   password1?: string;
//   password2?: string;
// }

// // Main function to check registration fields with type annotations
// export default function checkRegistrationFields(data: RegistrationData): { errors: RegistrationErrors, isValid: boolean } {
//   let errors: RegistrationErrors = {};

//   // Simplified assignment with default empty strings
//   data.email = !ifEmpty(data.email) ? data.email : "";
//   data.password1 = !ifEmpty(data.password1) ? data.password1 : "";
//   data.password2 = !ifEmpty(data.password2) ? data.password2 : "";

//   // Validations
//   if (Validator.isEmpty(data.email)) {
//     errors.email = "Email is required";
//   }
//   if (!Validator.isEmail(data.email)) {
//     errors.email = "Email address is invalid";
//   }
//   if (Validator.isEmpty(data.password1)) {
//     errors.password1 = "Password is required";
//   }
//   if (!Validator.isLength(data.password1, { min: 8, max: 120 })) {
//     errors.password1 = "Passwords must be greater than 8 characters";
//   }
//   if (Validator.isEmpty(data.password2)) {
//     errors.password2 = "Confirmation password is required";
//   }
//   if (!Validator.equals(data.password1, data.password2)) {
//     errors.password2 = "Both password fields must match";
//   }

//   // Return the errors and the validity status
//   return {
//     errors,
//     isValid: ifEmpty(errors)
//   };
// }
// simple-api/validation/register.js
const Validator = require("validator");
const ifEmpty = require("./checkForEmpty");

module.exports = function checkRegistrationFields(data) {
  // An errors object is created
  let errors = {};

  // If data.email is not empty, data.email = data.email
  // else if empty, data.email = ""
  data.email = !ifEmpty(data.email) ? data.email : "";
  data.password1 = !ifEmpty(data.password1) ? data.password1 : "";
  data.password2 = !ifEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email address is invalid";
  }
  if (Validator.isEmpty(data.password1)) {
    errors.password1 = "Password is required";
  }
  if (!Validator.isLength(data.password1, { min: 8, max: 120 })) {
    errors.password1 = "Passwords must be greater than 8 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirmation password is required";
  }
  if (!Validator.equals(data.password1, data.password2)) {
    errors.password2 = "Both password fields must match";
  }

  // Return the errors from the checkRegistrationFields function
  // and use the ifEmpty function to check if the errors object is empty
  return {
    errors,
    isValid: ifEmpty(errors)
  };
};
