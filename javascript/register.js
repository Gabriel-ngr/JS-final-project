import toastr from "./toastr.js";
import { validateEmailInput, validatePasswordInput, validateFirstNameInput, validateLastNameInput, addBirthDateInputEvent, validateBirthDateInput } from "./validation.js";

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const firstNameInput = document.getElementById("firstname-input");
const lastNameInput = document.getElementById("lastname-input");
const birthDateInput = document.getElementById("birth-input");
addBirthDateInputEvent(birthDateInput);
const registerBtn = document.getElementById("button-register");
const showHidePassword = document.getElementById("show-password");

registerBtn.addEventListener("click", function () {
   let inputs = [
      { input: emailInput, validate: validateEmailInput },
      { input: passwordInput, validate: validatePasswordInput },
      { input: firstNameInput, validate: validateFirstNameInput },
      { input: lastNameInput, validate: validateLastNameInput },
      { input: birthDateInput, validate: validateBirthDateInput },
   ];

   let errors = inputs.filter(({ input, validate }) => !validate(input)).map(({ error }) => error);

   if (errors.length > 0) {
      // toastr.error(errors.join("\n"));
   } else {
      validateEmailInput(emailInput) && validatePasswordInput(passwordInput) && validateFirstNameInput(firstNameInput) && validateLastNameInput(lastNameInput) && addBirthDateInputEvent(birthDateInput) && validateBirthDateInput(birthDateInput);
      const dataFromInput = {
         email: emailInput.value,
         password: passwordInput.value,
         firstName: firstNameInput.value,
         lastName: lastNameInput.value,
         birthDate: birthDateInput.value,
      };
      // Get the existing data from localStorage
      let existingUsers = JSON.parse(localStorage.getItem("users"));
      if (!Array.isArray(existingUsers)) {
         existingUsers = [];
      }
      // Add the new data to the existing data
      existingUsers.push(dataFromInput);
      // Save the updated data back to localStorage
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Clear the input fields
      emailInput.value = "";
      passwordInput.value = "";
      firstNameInput.value = "";
      lastNameInput.value = "";
      birthDateInput.value = "";

      // Display succes message
      toastr["success"]("You just create a new account!");

      // Redirect to the next page after a delay
      setTimeout(function () {
         window.location.href = "login.html";
      }, 2000); // 3 seconds
   }
});

// Password show/hide
showHidePassword.addEventListener("click", function () {
   if (passwordInput.type === "password") {
      passwordInput.type = "text";
   } else {
      passwordInput.type = "password";
   }
});
