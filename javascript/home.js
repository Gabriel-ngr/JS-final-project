// Importing necessary variables and functions from home-validation.js
import { inputDateAvailable, inputCity, inputRentPrice, inputYearBuilt, inputStreetName, inputStreetNumber, inputAreaSize, validateInputCity, validateStreetName, validateStreetNumber, validateAreaSize, validateYearBuilt, validateRentPrice, validateDate, inputAC } from "./home-validation.js";

// Getting button elements from the DOM
const addFlatBtn = document.getElementById("addBtn");
const viewFlatsBtn = document.getElementById("viewBtn");
const profileBtn = document.getElementById("profileBtn");
const favouriteBtn = document.getElementById("favouriteBtn");
const logoutBtn = document.getElementById("logoutBtn");
const submitBtn = document.getElementById("saveBtn");

// Getting container elements from the DOM
const welcomePageContainer = document.querySelector(".welcome-homepage-section");
const addFlatContainer = document.querySelector(".add__flat__container");
const viewFlatContainer = document.querySelector(".view__flat__container");
const updateProfileContainer = document.querySelector(".update__profile__container");
const favouriteFlatsContainer = document.querySelector(".favourite__flats__container");

// On window load, get the current user from local storage and display a welcome message
window.onload = () => {
   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   document.getElementById("welcomeMessage").textContent = currentUser ? `Welcome, ${currentUser.username}` : "";
};

// ADD NEW FLAT CONTAINER
// Add event listener to addFlatBtn to show the addFlatContainer when clicked
addFlatBtn.addEventListener("click", (e) => {
   e.preventDefault();

   // Create an array of input fields and their corresponding validation functions
   const inputFields = [
      { input: inputCity, validate: validateInputCity },
      { input: inputStreetName, validate: validateStreetName },
      { input: inputStreetNumber, validate: validateStreetNumber },
      { input: inputAreaSize, validate: validateAreaSize },
      { input: inputYearBuilt, validate: validateYearBuilt },
      { input: inputRentPrice, validate: validateRentPrice },
      { input: inputDateAvailable, validate: validateDate },
   ];

   // Validate each input field
   inputFields.forEach(({ input, validate }) => validate(input));

   hideAllContainers();
   addFlatContainer.style.display = "flex";
});

// SUBMIT BUTTON FOR FLAT CONTAINER
function isEmpty(apartment) {
   return Object.entries(apartment).some(([key, value]) => {
      if (key === "hasAC") {
         return false; // Skip the 'hasAC' field
      }
      return !value;
   });
}

// Function show succesc/error message
function showMessage(title, text, icon) {
   Swal.fire({
      title,
      text,
      icon,
      customClass: {
         popup: "my-popup",
      },
   });
}
// Function reset all input after all inputs passed the validation
function resetInputs(inputs) {
   inputs.forEach((input) => {
      input.value = "";
      input.style = "";

      let checkIcon = input.parentNode.querySelector(".fa-check");
      let wrongIcon = input.parentNode.querySelector(".fa-times");
      if (checkIcon) {
         checkIcon.style.display = "none";
      }
      if (wrongIcon) {
         wrongIcon.style.display = "none";
      }
   });
}

// Function to update local storage
function updateLocalStorage(currentUser, newApartment) {
   currentUser.apartments = currentUser.apartments || [];
   currentUser.apartments.push(newApartment);
   localStorage.setItem("currentUser", JSON.stringify(currentUser));

   let users = JSON.parse(localStorage.getItem("users")) || [];
   let userIndex = users.findIndex((user) => user.email === currentUser.email);
   if (userIndex !== -1) {
      users[userIndex].apartments = users[userIndex].apartments || [];
      users[userIndex].apartments.push(newApartment);
      localStorage.setItem("users", JSON.stringify(users));
   }
}

// Add event listener to submitBtn to save the form data to local storage when clicked
submitBtn.addEventListener("click", () => {
   let currentUser = JSON.parse(localStorage.getItem("currentUser"));

   let newApartment = {
      id: "apt-" + Math.floor(Math.random() * 10000), // Generate a random unique ID
      city: inputCity.value,
      streetName: inputStreetName.value,
      streetNumber: inputStreetNumber.value,
      areaSize: inputAreaSize.value,
      hasAC: inputAC.value === "Yes" ? true : false,
      yearBuilt: inputYearBuilt.value,
      rentPrice: inputRentPrice.value,
      date: inputDateAvailable.value,
   };

   if (isEmpty(newApartment)) {
      showMessage("RentEase Client", "All inputs must be completed!", "error");
   } else {
      if (currentUser) {
         updateLocalStorage(currentUser, newApartment);
         showMessage("RentEase Client", "You just add a new flat!", "success");
         resetInputs([inputCity, inputStreetName, inputStreetNumber, inputAreaSize, inputYearBuilt, inputRentPrice, inputDateAvailable]);
      }
      generateTabel();
   }
});

// GENERATE THE TABEL FLATS
function generateTabel() {
   // Check if the table already exist and don't create another one
   if (document.querySelector(".table__flats__container")) return;

   let tabelFlats = document.createElement("table");
   tabelFlats.setAttribute("class", "table__flats__container");

   // Create titles for the tabel
   let titles = ["City", "Street Name", "Street Number", "Area Size", "Has AC", "Year Built", "Rent Price", "Date Available", "❌", "❤️"];

   let headerRow = document.createElement("tr");
   headerRow.setAttribute("class", "header__tabel");

   titles.forEach((title, index) => {
      let th = document.createElement("th");
      th.setAttribute("class", "theader");

      // Add a span for the arrow only for sortable columns
      if (title !== "❌" && title !== "❤️") {
         th.innerHTML = title + " <span></span>"; // Add a span for the arrow

         // Add click event listener for sorting
         th.addEventListener("click", () => {
            let tableBody = tabelFlats.querySelector("tbody");
            let rowsArray = Array.from(tableBody.rows);

            // Determine the sort order
            let sortOrder = th.getAttribute("data-sort-order");
            if (!sortOrder || sortOrder === "desc") {
               sortOrder = "asc";
               th.querySelector("span").textContent = " ↑"; // Set arrow to up
            } else {
               sortOrder = "desc";
               th.querySelector("span").textContent = " ↓"; // Set arrow to down
            }
            th.setAttribute("data-sort-order", sortOrder);

            // Sort the rows
            rowsArray.sort((a, b) => {
               let cellA = a.cells[index].textContent;
               let cellB = b.cells[index].textContent;

               // Convert to number if possible
               if (!isNaN(cellA)) cellA = Number(cellA);
               if (!isNaN(cellB)) cellB = Number(cellB);

               if (sortOrder === "asc") {
                  if (cellA < cellB) return -1;
                  if (cellA > cellB) return 1;
                  return 0;
               } else {
                  if (cellA > cellB) return -1;
                  if (cellA < cellB) return 1;
                  return 0;
               }
            });

            // Clear the table body and add the sorted rows
            tableBody.innerHTML = "";
            rowsArray.forEach((row) => tableBody.appendChild(row));
         });
      } else {
         th.textContent = title; // For non-sortable columns, just set the text
      }

      headerRow.appendChild(th);
   });

   let thead = document.createElement("thead");
   thead.appendChild(headerRow);

   tabelFlats.appendChild(thead);

   let tbody = document.createElement("tbody");

   // Extract data about apartments from local storage
   let apartments = JSON.parse(localStorage.getItem("currentUser")).apartments;

   // Parcurgem fiecare apartament și creăm un rând nou în tabel pentru fiecare apartament
   apartments.forEach((apartment) => {
      let row = document.createElement("tr");
      row.setAttribute("class", "tabel__row");

      // Adăugăm datele apartamentului în rândul corespunzător din tabel
      Object.entries(apartment).forEach(([key, value]) => {
         if (key !== "id") {
            // Skip the id property
            let td = document.createElement("td");
            td.setAttribute("class", "table__data");
            td.textContent = value;
            td.setAttribute("data-title", key);
            row.appendChild(td);
         }

         tbody.appendChild(row);
      });

      // Creăm butonul de "Delete"
      let deleteTd = document.createElement("td");
      let deleteBtn = document.createElement("button");
      deleteTd.setAttribute("class", "button__cell");
      deleteBtn.setAttribute("id", "deleteBtn");
      deleteBtn.textContent = "Delete";
      deleteTd.appendChild(deleteBtn);
      row.appendChild(deleteTd);

      // Add event listener to the "Delete" button
      deleteBtn.addEventListener("click", () => {
         Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
         }).then((result) => {
            if (result.isConfirmed) {
               // Remove the apartment from local storage
               let currentUser = JSON.parse(localStorage.getItem("currentUser"));

               currentUser.apartments = currentUser.apartments.filter((a) => a.id !== apartment.id);

               if (currentUser.favourite && currentUser.favourite.length > 0) {
                  currentUser.favourite = currentUser.favourite.filter((a) => a.id !== apartment.id);
               }

               localStorage.setItem("currentUser", JSON.stringify(currentUser));

               // Remove the row from the table
               row.remove();

               Swal.fire({
                  title: "Deleted!",
                  text: "Your apartment has been deleted!",
                  icon: "success",
               });
            }
         });
      });

      // Creăm butonul de "Favourite"
      let favouriteTd = document.createElement("td");
      let favouriteBtn = document.createElement("button");
      favouriteTd.setAttribute("class", "button__cell");
      favouriteBtn.setAttribute("id", "favouriteBtn");
      favouriteBtn.textContent = "Favourite";
      favouriteTd.appendChild(favouriteBtn);
      row.appendChild(favouriteTd);

      // Check if the apartment is already in the user's favourites
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser.favourite && currentUser.favourite.some((a) => a.id === apartment.id)) {
         favouriteBtn.style.backgroundColor = "lightgreen";
         favouriteBtn.textContent = "Unfavourite";
      }

      // Add event listener to the "favourite" button
      favouriteBtn.addEventListener("click", () => {
         let currentUser = JSON.parse(localStorage.getItem("currentUser"));
         if (!currentUser.favourite) {
            currentUser.favourite = [];
         }

         let isAlreadyFavourite = currentUser.favourite.some((a) => a.id === apartment.id);

         if (!isAlreadyFavourite) {
            currentUser.favourite.push(apartment);
            favouriteBtn.style.backgroundColor = "lightgreen";
            favouriteBtn.textContent = "Unfavourite";
         } else {
            currentUser.favourite = currentUser.favourite.filter((a) => a.id !== apartment.id);
            favouriteBtn.style.backgroundColor = "";
            favouriteBtn.textContent = "Favourite";
         }

         localStorage.setItem("currentUser", JSON.stringify(currentUser));

         let users = JSON.parse(localStorage.getItem("users")) || [];
         let userIndex = users.findIndex((user) => user.email === currentUser.email);
         if (userIndex !== -1) {
            users[userIndex].favourite = users[userIndex].favourite || [];
            if (!isAlreadyFavourite) {
               users[userIndex].favourite.push(apartment);
            } else {
               users[userIndex].favourite = users[userIndex].favourite.filter((a) => a.id !== apartment.id);
            }
            localStorage.setItem("users", JSON.stringify(users));
         }
      });

      // Append the row to the table
      tabelFlats.appendChild(tbody);
      viewFlatContainer.appendChild(tabelFlats);
   });
}

// In the viewFlatsBtn click event listener
viewFlatsBtn.addEventListener("click", () => {
   hideAllContainers();
   viewFlatContainer.style.display = "flex";

   // Remove the existing table if it exists
   let existingTable = document.querySelector(".table__flats__container");
   if (existingTable) {
      existingTable.remove();
   }

   generateTabel();
});

//! PROFILE UPDATE CONTAINER
profileBtn.addEventListener("click", () => {
   hideAllContainers();
   updateProfileContainer.style.display = "flex";

   // Check if form exist , if exist don't let me create another one
   if (document.querySelector(".update__form")) return;

   function createInputField(type, id, placeholder, labelText) {
      let input = document.createElement("input");
      input.type = type;
      input.id = id;
      input.placeholder = placeholder;

      let label = document.createElement("label");
      label.for = id;
      label.textContent = labelText;

      let container = document.createElement("div");
      container.setAttribute("class", "input-container");
      container.appendChild(label);
      container.appendChild(input);

      return { container, input };
   }

   let form = document.createElement("form");
   form.setAttribute("class", "update__form");

   let updateFormTitle = document.createElement("h2");
   updateFormTitle.textContent = "Update Profile";
   form.appendChild(updateFormTitle);

   let fields = [
      { type: "email", id: "email", placeholder: "Email", labelText: "Email" },
      { type: "text", id: "firstName", placeholder: "First Name", labelText: "First Name" },
      { type: "text", id: "lastName", placeholder: "Last Name", labelText: "Last Name" },
      { type: "password", id: "password", placeholder: "Password", labelText: "Password" },
      { type: "date", id: "birthDate", placeholder: "Date", labelText: "Birth Date" },
   ];

   let inputs = {};
   fields.forEach((field) => {
      let { container, input } = createInputField(field.type, field.id, field.placeholder, field.labelText);
      form.appendChild(container);
      inputs[field.id] = input;

      // Create a span element to display error message
      let errorSpan = document.createElement("span");
      errorSpan.setAttribute("class", "error-message");
      errorSpan.style.color = "red";
      container.appendChild(errorSpan);

      input.addEventListener("input", function (event) {
         // General empty input validation
         if (!event.target.value.trim()) {
            errorSpan.textContent = "This field cannot be empty";
            currentUser[event.target.id] = null;
            return; // Exit the function early
         }

         // Validate input here
         if (event.target.id === "email") {
            // Simple email validation
            if (!/\S+@\S+\.\S+/.test(event.target.value)) {
               errorSpan.textContent = "Invalid email";
               currentUser[event.target.id] = null; // Clear the field in currentUser object
            } else {
               errorSpan.textContent = "";
               currentUser[event.target.id] = event.target.value; // Update the field in currentUser object
            }
         } else if (event.target.id === "password") {
            // Simple password validation
            if (event.target.value.length < 8) {
               errorSpan.textContent = "Password should be at least 8 characters long";
               currentUser[event.target.id] = null;
            } else {
               errorSpan.textContent = "";
               currentUser[event.target.id] = event.target.value;
            }
         } else if (event.target.id === "firstname" || event.target.id === "lastname") {
            // Simple text validation
            if (/^[A-Za-z]+$/.test(event.target.value)) {
               errorSpan.textContent = "This field cannot contain numbers";
               currentUser[event.target.id] = null;
            } else {
               errorSpan.textContent = "";
               currentUser[event.target.id] = event.target.value;
            }
         } else {
            errorSpan.textContent = "";
            currentUser[event.target.id] = event.target.value;
         }
      });
   });

   let updateButton = document.createElement("button");
   updateButton.id = "updateButton";
   updateButton.textContent = "Update";
   form.appendChild(updateButton);

   updateProfileContainer.appendChild(form);

   // Retrieve the current user's information from localStorage
   let currentUser = JSON.parse(localStorage.getItem("currentUser"));

   // Populate the input fields with the current user's data
   inputs.email.value = currentUser.email || "";
   inputs.firstName.value = currentUser.firstName || "";
   inputs.lastName.value = currentUser.lastName || "";
   inputs.password.value = currentUser.password || "";
   inputs.birthDate.value = currentUser.birthDate || "";

   // Add event listener to updateButton
   updateButton.addEventListener("click", function (event) {
      event.preventDefault();

      if (!inputs.email.value.trim() || !inputs.firstName.value.trim() || !inputs.lastName.value.trim() || !inputs.password.value.trim()) {
         Swal.fire({
            title: "RentEase Client",
            text: "All inputs must be completed!",
            icon: "error",
         });
         return;
      }

      let users = JSON.parse(localStorage.getItem("users"));
      let userIndex = users.findIndex((user) => user.id === currentUser.id);
      // Dacă utilizatorul există în array, îi actualizăm datele
      if (userIndex !== -1) {
         users[userIndex].email = inputs.email.value;
         users[userIndex].firstName = inputs.firstName.value;
         users[userIndex].lastName = inputs.lastName.value;
         users[userIndex].password = inputs.password.value;
         users[userIndex].username = `${inputs.firstName.value} ${inputs.lastName.value}`;
         // Salvăm înapoi array-ul de users în localStorage
         localStorage.setItem("users", JSON.stringify(users));
      }

      // Update the current user's information
      currentUser.email = inputs.email.value;
      currentUser.firstName = inputs.firstName.value;
      currentUser.lastName = inputs.lastName.value;
      currentUser.password = inputs.password.value;
      currentUser.birthDate = inputs.birthDate.value;
      currentUser.username = `${inputs.firstName.value} ${inputs.lastName.value}`;

      // Save the updated current user's information back to localStorage
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      Swal.fire({
         title: "RentEase Client",
         text: "The data has been updated!",
         icon: "success",
      });

      // Clear the input fields
      ["email", "firstName", "lastName", "password", "birthDate"].forEach((field) => {
         inputs[field].value = "";
      });

      // updateProfileContainer.style.display = "none";
      // welcomePageContainer.style.display = "flex";
   });
});

//! FAVOURITE CONTAINER
// Function to create a table header
function createTableHeader(headers, tabel) {
   const headerRow = tabel.insertRow();
   headerRow.setAttribute("class", "header__row");

   headers.forEach((header) => {
      const th = document.createElement("th");
      th.setAttribute("class", "theader");
      th.textContent = header;
      headerRow.appendChild(th);
   });
}
// Function to populate the table with data
function populateTableData(user, table, headers) {
   // Check if the user and the user's favourite list exist
   if (user && user.favourite) {
      // Loop through each item in the favourite list
      user.favourite.forEach((item) => {
         const row = table.insertRow();
         row.setAttribute("class", "tabelrow__data");

         // Exclude uniqueId from the table
         const itemWithoutUniqueId = { ...item };
         delete itemWithoutUniqueId.id;

         // Loop through each value in the item
         let index = 0;
         Object.values(itemWithoutUniqueId).forEach((value) => {
            const cell = row.insertCell();
            cell.textContent = value;
            cell.setAttribute("data-title", headers[index]);
            index++;
         });
      });
   }
}
// Add an event listener for the click event on the favourite button
favouriteBtn.addEventListener("click", () => {
   hideAllContainers();
   favouriteFlatsContainer.style.display = "flex";

   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   // Check if a table already exists
   if (favouriteFlatsContainer.getElementsByTagName("table").length > 0) {
      // If a table already exists, remove it
      favouriteFlatsContainer.removeChild(favouriteFlatsContainer.getElementsByTagName("table")[0]);
   }

   // Create a new tabel
   const tabelFlats = document.createElement("table");
   tabelFlats.setAttribute("class", "table__flats_container");
   // Create table headers
   const headers = ["City", "Street Name", "Street Number", "Area Size", "Has AC", "Rent Price", "Year Built", "Date Available"];
   // Calling the functions
   createTableHeader(headers, tabelFlats);
   populateTableData(currentUser, tabelFlats, headers);

   // Append the new table to the favourite flats container
   favouriteFlatsContainer.appendChild(tabelFlats);
});

// LOGOUT BUTTON REDIRECTED TO LOGIN PAGE
logoutBtn.addEventListener("click", () => {
   window.location.href = "login.html";
});

//! FUNCTION TO HIDE ALL CONTAINERS
function hideAllContainers() {
   const containers = [welcomePageContainer, addFlatContainer, viewFlatContainer, updateProfileContainer, favouriteFlatsContainer];
   // Loop through each container and set its display style to "none"
   containers.forEach((container) => (container.style.display = "none"));
}

// BURGER MENU
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
const menuButtons = document.querySelectorAll(".off-screen-menu button");
const mainContent = document.querySelector(".main-section");
const container = [addFlatContainer, viewFlatContainer, updateProfileContainer, favouriteFlatsContainer];

hamMenu.addEventListener("click", () => {
   hamMenu.classList.toggle("active");
   offScreenMenu.classList.toggle("active");
});

// // Add event listener to each button
// menuButtons.forEach((button, index) => {
//    button.addEventListener("click", () => {
//       // Hide the off-screen menu
//       offScreenMenu.classList.remove("active");
//       hamMenu.classList.remove("active");

//       // Hide all containers
//       hideAllContainers();

//       // Show the corresponding container
//       // The index of the button corresponds to the index of the container
//       if (container[index]) {
//          container[index].style.display = "flex";
//       }
//    });
// });
