const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9\r\n]).{6,}$/;
const nameRegex = /^[A-Z][a-zA-Z]{1,}$/;
const birthRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;

// Validate email
export function validateEmailInput(emailInput) {
   if (emailRegex.test(emailInput.value)) {
      emailInput.style.color = "green";
      // emailInput.value = "";
      return true;
   } else if (emailInput.value === "") {
      toastr["warning"]("This input is empty!");
   } else {
      toastr["error"]("Invalid email address!", "E-mail");
      emailInput.style.color = "red";
      return false;
   }
}

// Validate password
export function validatePasswordInput(passwordInput) {
   if (passwordRegex.test(passwordInput.value)) {
      passwordInput.style.color = "green";
      // passwordInput.value = "";
      return true;
   } else if (passwordInput.value === "") {
      toastr["warning"]("This input is empty!");
   } else {
      toastr["error"]("Password must contain at least 6 characters", "Password");
      passwordInput.style.color = "red";
      return false;
   }
}

// Validate Name
export function validateFirstNameInput(firstNameInput) {
   if (nameRegex.test(firstNameInput.value)) {
      firstNameInput.style.color = "green";
      return true;
   } else if (firstNameInput.value === "") {
      toastr["warning"]("This input is empty!");
   } else {
      toastr["error"]("This field is required!", "Name");
      firstNameInput.style.color = "red";
      return false;
   }
}

export function validateLastNameInput(lastNameInput) {
   if (nameRegex.test(lastNameInput.value)) {
      lastNameInput.style.color = "green";
      return true;
   } else if (lastNameInput.value === "") {
      toastr["warning"]("This input is empty!");
   } else {
      toastr["error"]("This field is required!", "Name");
      lastNameInput.style.color = "red";
      return false;
   }
}

// Validate birthDate
export function addBirthDateInputEvent(birthDateInput) {
   birthDateInput.addEventListener("input", function (e) {
      if ((e.target.value.length == 2 || e.target.value.length == 5) && e.target.value.slice(-1) !== "/") {
         e.target.value += "/";
      }
      // Limit total input length to 10 characters
      if (e.target.value.length > 10) {
         e.target.value = e.target.value.slice(0, 10);
      }
   });
}

export function validateBirthDateInput(birthDateInput) {
   // Check if the input matches the regex
   if (birthRegex.test(birthDateInput.value)) {
      birthDateInput.style.color = "green";
      return true;
   } else if (birthDateInput.value === "") {
      toastr["warning"]("This input is empty!");
   } else {
      toastr["error"]("Invalid date format. Use DD/MM/YYYY", "Birth Date");
      birthDateInput.style.color = "red";
      return false;
   }
}