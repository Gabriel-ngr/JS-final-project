import toastr from "./toastr.js";

const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login-button");

const errorUser = document.getElementById("error-username");
const errorPassword = document.getElementById("error-password");

loginBtn.addEventListener("click", function () {
   let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
   let user = existingUsers.find((user) => user.username === usernameInput.value);

   if (usernameInput.value.trim() === "") {
      errorUser.textContent = "Can't be blank!";
      usernameInput.style.border = "2px solid red";
      return;
   } else if (!user) {
      errorUser.textContent = "Username does not exist!";
      usernameInput.style.border = "2px solid red";
      return;
   } else {
      usernameInput.style.border = "2px solid green";
      errorUser.textContent = "";
   }

   if (passwordInput.value.trim() === "") {
      errorPassword.textContent = "Can't be blank!";
      passwordInput.style.border = "2px solid red";
      return;
   } else if (!user || user.password !== passwordInput.value) {
      errorPassword.textContent = "Password is incorrect!";
      passwordInput.style.border = "2px solid red";
      return;
   } else {
      passwordInput.style.border = "2px solid green";
      errorPassword.textContent = "";
   }

   // Autentificare reușită
   // Salvați utilizatorul curent în localStorage
   localStorage.setItem("currentUser", JSON.stringify(user));
   Swal.fire({
      text: "You have successfully logged in!",
      icon: "success",
      heightAuto: false,
      backdrop: false,
      willClose: function () {
         window.location.href = "home.html";
      },
   });
});
