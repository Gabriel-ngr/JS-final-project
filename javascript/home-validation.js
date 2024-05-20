// DOM ELEMENTS FROM INPUTS
export const inputCity = document.getElementById("input-city");
export const inputStreetName = document.getElementById("input-street-name");
export const inputStreetNumber = document.getElementById("input-street-number");
export const inputAreaSize = document.getElementById("input-area-size");
export const inputAC = document.getElementById("input-ac");
export const inputYearBuilt = document.getElementById("input-year-built");
export const inputRentPrice = document.getElementById("input-rent-price");
export const inputDateAvailable = document.getElementById("input-date-available");

// DOM ELEMENTS ERROR MESSAGE
export const errorCity = document.getElementById("error-city");
export const errorStreetName = document.getElementById("error-street-name");
export const errorStreetNumber = document.getElementById("error-street-number");
export const errorAreaSize = document.getElementById("error-area-size");
export const errorHasAc = document.getElementById("error-has-ac");
export const errorYearBuilt = document.getElementById("error-year-built");
export const errorRentPrice = document.getElementById("error-rent-price");
export const errorDateAvailable = document.getElementById("error-date");

// REGEX VALIDATION
let regexLetters = /^[a-zA-Z .]+$/;
let regexNumbers = /^[0-9]+$/;
let regexAreaSize = /^\d+mp\s*$/;

// VALIDATION INPUTS
export function validateInputCity(inputCity) {
   let checkIcon = inputCity.parentNode.querySelector(".fa-check");
   let wrongIcon = inputCity.parentNode.querySelector(".fa-times");
   inputCity.addEventListener("input", () => {
      if (inputCity.value.trim() === "") {
         errorCity.textContent = "Can't be blank!";
         inputCity.style.border = "1px solid red";
         checkIcon.style.display = "none";
         wrongIcon.style.display = "flex";
         return false;
      } else if (!regexLetters.test(inputCity.value)) {
         errorCity.textContent = "Only letters!";
         inputCity.style.border = "1px solid red";
         checkIcon.style.display = "none";
         wrongIcon.style.display = "flex";
         return false;
      } else {
         inputCity.style.border = "2px solid green";
         errorCity.textContent = "";
         checkIcon.style.display = "flex";
         wrongIcon.style.display = "none";
         return true;
      }
   });
}

export function validateStreetName(inputStreetName) {
   let checkIcon = inputStreetName.parentNode.querySelector(".fa-check");
   let wrongIcon = inputStreetName.parentNode.querySelector(".fa-times");
   inputStreetName.addEventListener("input", () => {
      if (inputStreetName.value.trim() === "") {
         errorStreetName.textContent = "Can't be blank!";
         inputStreetName.style.border = "1px solid red";
         checkIcon.style.display = "none";
         wrongIcon.style.display = "flex";
         return false;
      } else if (!regexLetters.test(inputStreetName.value)) {
         errorStreetName.textContent = "Only letters!";
         inputStreetName.style.border = "1px solid red";
         checkIcon.style.display = "none";
         wrongIcon.style.display = "flex";
         return false;
      } else {
         inputStreetName.style.border = "2px solid green";
         errorStreetName.textContent = "";
         checkIcon.style.display = "flex";
         wrongIcon.style.display = "none";
         return true;
      }
   });
}

export function validateStreetNumber(inputStreetNumber) {
   let checkIcon = inputStreetNumber.parentNode.querySelector(".fa-check");
   let wrongIcon = inputStreetNumber.parentNode.querySelector(".fa-times");
   inputStreetNumber.addEventListener("input", () => {
      if (inputStreetNumber.value.trim() === "") {
         errorStreetNumber.textContent = "Can't be blank!";
         inputStreetNumber.style.border = "1px solid red";
         checkIcon.style.display = "none";
         wrongIcon.style.display = "flex";
         return false;
      } else if (!regexNumbers.test(inputStreetNumber.value)) {
         errorStreetNumber.textContent = "Only numbers!";
         inputStreetNumber.style.border = "1px solid red";
         checkIcon.style.display = "none";
         wrongIcon.style.display = "flex";
         return false;
      } else {
         inputStreetNumber.style.border = "2px solid green";
         errorStreetNumber.textContent = "";
         checkIcon.style.display = "flex";
         wrongIcon.style.display = "none";
         return true;
      }
   });
}

export function validateAreaSize(inputAreaSize) {
   let checkIcon = inputAreaSize.parentNode.querySelector(".fa-check");
   let wrongIcon = inputAreaSize.parentNode.querySelector(".fa-times");

   inputAreaSize.addEventListener("input", () => {
      if (inputAreaSize.value.trim() === "") {
         errorAreaSize.textContent = "Can't be blank!";
         inputAreaSize.style.border = "1px solid red";
         checkIcon.style.display = "none";
         wrongIcon.style.display = "flex";
         return false;
      } else if (!regexAreaSize.test(inputAreaSize.value)) {
         errorAreaSize.textContent = "Must be contain numbers and 'mp' ";
         inputAreaSize.style.border = "1px solid red";
         checkIcon.style.display = "none";
         wrongIcon.style.display = "flex";
         return false;
      } else {
         inputAreaSize.style.border = "2px solid green";
         errorAreaSize.textContent = "";
         checkIcon.style.display = "flex";
         wrongIcon.style.display = "none";
         return true;
      }
   });
}


export function validateYearBuilt(inputYearBuilt) {
   let checkIcon = inputYearBuilt.parentNode.querySelector(".fa-check");
   let wrongIcon = inputYearBuilt.parentNode.querySelector(".fa-times");
   let currentYear = new Date().getFullYear();

   inputYearBuilt.addEventListener("keydown", (e) => {
      if (inputYearBuilt.value.length >= 4 && e.key !== "Backspace" && e.key !== "Delete") {
         e.preventDefault();
      }
   });

   inputYearBuilt.addEventListener("input", () => {
      if (inputYearBuilt.value.trim() === "") {
         errorYearBuilt.textContent = "Can't be blank!";
         inputYearBuilt.style.border = "1px solid red";
         checkIcon.style.display = "none";
         wrongIcon.style.display = "flex";
         return false;
      } else if (!regexNumbers.test(inputYearBuilt.value)) {
         errorYearBuilt.textContent = "Must contain only numbers!";
         inputYearBuilt.style.border = "1px solid red";
         checkIcon.style.display = "none";
         wrongIcon.style.display = "flex";
         return false;
      } else if (inputYearBuilt.value.length !== 4) {
         errorYearBuilt.textContent = "Must be a 4-digit number!";
         inputYearBuilt.style.border = "1px solid red";
         checkIcon.style.display = "none";
         wrongIcon.style.display = "flex";
         return false;
      } else if (parseInt(inputYearBuilt.value) > currentYear) {
         errorYearBuilt.textContent = "Year can't be in the future!";
         inputYearBuilt.style.border = "1px solid red";
         checkIcon.style.display = "none";
         wrongIcon.style.display = "flex";
         return false;
      } else {
         errorYearBuilt.textContent = "";
         inputYearBuilt.style.border = "2px solid green";
         checkIcon.style.display = "flex";
         wrongIcon.style.display = "none";
         return true;
      }
   });
}

export function validateRentPrice(inputRentPrice) {
   let checkIcon = inputRentPrice.parentNode.querySelector(".fa-check");
   let wrongIcon = inputRentPrice.parentNode.querySelector(".fa-times");
   let regexPrice = /^\$?\d+(\/month)?$/;

   inputRentPrice.addEventListener("input", () => {
      if (inputRentPrice.value.trim() === "") {
         errorRentPrice.textContent = "Can't be blank!";
         inputRentPrice.style.border = "1px solid red";
         checkIcon.style.display = "none";
         wrongIcon.style.display = "flex";
         return false;
      } else if (!regexPrice.test(inputRentPrice.value)) {
         errorRentPrice.textContent = "Must contain numbers!";
         inputRentPrice.style.border = "1px solid red";
         checkIcon.style.display = "none";
         wrongIcon.style.display = "flex";
         return false;
      } else {
         errorRentPrice.textContent = "";
         inputRentPrice.style.border = "2px solid green";
         checkIcon.style.display = "flex";
         wrongIcon.style.display = "none";
         return true;
      }
   });
}

export function validateDate(inputDateAvailable) {
   inputDateAvailable.addEventListener("input", () => {
      if (inputDateAvailable.value.trim() === "") {
         errorDateAvailable.textContent = "Can't be blank!";
         inputDateAvailable.style.border = "1px solid red";
         return false;
      } else {
         errorDateAvailable.textContent = "";
         inputDateAvailable.style.border = "2px solid green";
         return true;
      }
   });
}
