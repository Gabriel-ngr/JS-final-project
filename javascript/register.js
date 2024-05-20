// Import toastr and validation functions.
import toastr from "./toastr.js";
import { validateEmailInput, validatePasswordInput, confirmMatchPassword, validateFirstNameInput, validateLastNameInput, validateBirthDateInput, addPasswordToggleEventListeners } from "./validation.js";

// Get references to DOM elements.
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const confirmPassword = document.getElementById("confirm-password-input");
const firstNameInput = document.getElementById("firstname-input");
const lastNameInput = document.getElementById("lastname-input");
const birthDateInput = document.getElementById("birth-input");
const registerBtn = document.getElementById("button-register");

// Atach input event listener to inputs for real-time validation.
emailInput.addEventListener("input", () => validateEmailInput(emailInput));
passwordInput.addEventListener("input", () => validatePasswordInput(passwordInput));
confirmPassword.addEventListener("input", () => confirmMatchPassword(confirmPassword));
firstNameInput.addEventListener("input", () => validateFirstNameInput(firstNameInput));
lastNameInput.addEventListener("input", () => validateLastNameInput(lastNameInput));
birthDateInput.addEventListener("input", () => validateBirthDateInput(birthDateInput));

// Get references to all input elements
const allInputs = [emailInput, passwordInput, confirmPassword, firstNameInput, lastNameInput, birthDateInput];

// Add function for clear inputs after all fields are completed and press buton.
function clearInputs(inputs) {
   inputs.forEach((input) => {
      input.value = "";
   });
}

function resetInputStyles(inputs) {
   inputs.forEach((input) => {
      input.style.border = "";
   });
}

// Define User class.
class User {
   constructor(email, password, firstName, lastName, birthDate) {
      (this.id = Math.floor(Math.random() * 10000)), (this.email = email);
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthDate = birthDate;
      this.username = firstName + " " + lastName;
      this.apartments = [];
      this.favourite = [];
   }
}

registerBtn.addEventListener("click", () => {
   if (emailInput.value && passwordInput.value && confirmPassword.value && firstNameInput.value && lastNameInput.value && birthDateInput.value) {
      const user = new User(emailInput.value, passwordInput.value, firstNameInput.value, lastNameInput.value, birthDateInput.value);

      // Get existing data from localStorage.
      let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      if (!Array.isArray(existingUsers)) {
         existingUsers = [];
      }

      // Add the new data to the existing data.
      existingUsers.push(user);

      // Save the updated data back to localStorage.
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Clear the inputs fields.
      clearInputs(allInputs);
      resetInputStyles(allInputs);

      // Display succes message.
      toastr["success"]("You just create a new account!");
      setTimeout(function () {
         window.location.href = "login.html";
      }, 1000);
   } else {
      toastr["warning"]("All inputs must be completed!", "Inputs empty!");
   }
});

addPasswordToggleEventListeners();
