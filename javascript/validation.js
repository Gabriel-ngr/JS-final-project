const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9\r\n]).{6,}$/;
const nameRegex = /^[A-Z][a-zA-Z]{1,}$/;
const birthRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
const errorMessage = document.querySelectorAll(".error-message");
const firstNameError = document.getElementById("error-firstname-message");
const lastNameError = document.getElementById("error-lastname-message");

// Validate email input
export function validateEmailInput(emailInput) {
   emailInput.addEventListener("input", function () {
      if (emailInput.value.trim() == "") {
         emailInput.style.border = "2px solid red";
         errorMessage[0].innerHTML = "Email cannot be empty";
      } else if (!emailInput.value.includes("@")) {
         emailInput.style.border = "3px solid red";
         errorMessage[0].innerHTML = "The email must contain an '@'.";
      } else if (!emailRegex.test(emailInput.value)) {
         emailInput.style.border = "3px solid red";
         errorMessage[0].innerHTML = "The email entered is not valid.";
      } else {
         emailInput.style.border = "3px solid green";
         errorMessage[0].innerHTML = ""; // Clear any previous error message
         return true;
      }
   });
}

// Validate password input
let validatedPassword = null;
export function validatePasswordInput(passwordInput) {
   passwordInput.addEventListener("input", () => {
      if (passwordInput.value.trim() === "") {
         passwordInput.style.border = "2px solid red";
         errorMessage[1].innerHTML = "Password cannot be empty";
      } else if (passwordInput.value.length < 6) {
         passwordInput.style.border = "2px solid red";
         errorMessage[1].innerHTML = "Password must contain at least 6 characters";
      } else if (!passwordRegex.test(passwordInput.value)) {
         passwordInput.style.border = "2px solid red";
         errorMessage[1].innerHTML = "The password entered does not match";
      } else {
         passwordInput.style.border = "2px solid green";
         validatedPassword = passwordInput.value;
         errorMessage[1].innerHTML = "";
         return true;
      }
   });
}

export function confirmMatchPassword(confirmPassword) {
   confirmPassword.addEventListener("input", () => {
      if (confirmPassword.value.trim() === "") {
         confirmPassword.style.border = "2px solid red";
         errorMessage[2].innerHTML = "Password cannot be empty";
         return false;
      } else if (validatedPassword !== confirmPassword.value) {
         confirmPassword.style.border = "2px solid red";
         errorMessage[2].innerHTML = "Password didn't match, try again!";
      } else {
         confirmPassword.style.border = "2px solid green";
         errorMessage[2].innerHTML = "";
         return true;
      }
   });
}

// Validate firstName input
export function validateFirstNameInput(firstNameInput) {
   firstNameInput.addEventListener("input", () => {
      if (firstNameInput.value.trim() === "") {
         firstNameInput.style.border = "2px solid red";
         firstNameError.innerHTML = "It cannot be empty!";
      } else if (!nameRegex.test(firstNameInput.value)) {
         firstNameInput.style.border = "2px solid red";
         firstNameError.innerHTML = "It cannot be empty!";
         firstNameError.innerHTML = "The name is not correct";
      } else {
         firstNameInput.style.border = "2px solid green";
         firstNameError.innerHTML = "";
         return true;
      }
   });
}

// Validate lastName input
export function validateLastNameInput(lastNameInput) {
   lastNameInput.addEventListener("input", () => {
      if (lastNameInput.value.trim() === "") {
         lastNameInput.style.border = "2px solid red";
         lastNameError.innerHTML = "It cannot be empty!";
      } else if (!nameRegex.test(lastNameInput.value)) {
         lastNameInput.style.border = "2px solid red";
         lastNameError.innerHTML = "The name is not correct";
      } else {
         lastNameInput.style.border = "2px solid green";
         lastNameError.innerHTML = "";
         return true;
      }
   });
}

// VALIDATE BIRTHDATE INPUT
// VALIDATE BIRTHDATE INPUT
export function validateBirthDateInput(birthDateInput) {
   birthDateInput.addEventListener("change", () => {
      // Calculate the age
      const birthDate = new Date(birthDateInput.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
         age--;
      }

      if (birthDateInput.value.trim() === "") {
         birthDateInput.style.border = "2px solid red";
         errorMessage[3].textContent = "Cannot be empty!";
      } else if (birthDate > today) {
         birthDateInput.style.border = "2px solid red";
         errorMessage[3].textContent = "Cannot be in the future!";
      } else if (age < 18) {
         birthDateInput.style.border = "2px solid red";
         errorMessage[3].textContent = "You must be 18 years old!";
      } else {
         birthDateInput.style.border = "2px solid green";
         errorMessage[3].textContent = "";
      }
   });
}

// Provide functionality to toogle the visibility of password and confirm password fields.
export function addPasswordToggleEventListeners() {
   document.getElementById("show-password").addEventListener("click", function () {
      tooglePasswordVisibility("password-input");
   });
   document.getElementById("show-confirm-password").addEventListener("click", function () {
      tooglePasswordVisibility("confirm-password-input");
   });
}

export function tooglePasswordVisibility(inputId) {
   let input = document.getElementById(inputId);
   if (input.type === "password") {
      input.type = "text";
   } else {
      input.type = "password";
   }
}
