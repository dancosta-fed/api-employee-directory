/* BACK TO TOP BUTTON */
//Get the button:
myButton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Got this code online. Credit to: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp //

/*================================================================================ */
/*================================================================================ */


// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const arrowLeft = document.querySelector(".aLeft");
const arrowRight = document.querySelector(".aRight");
let modalIndex;

// fetch data from API
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

function displayEmployees(employeeData) {
  employees = employeeData;
  // store the employee HTML as we create it
  let employeeHTML = '';
  // loop through each employee and create HTML markup
  employees.forEach((employee, index) => {
  let name = employee.name;
  let email = employee.email;
  let city = employee.location.city;
  let picture = employee.picture;
  // template literals make this so much cleaner!
  employeeHTML += `
  <div class="card" data-index="${index}">
  <img class="avatar" src="${picture.large}" />
  <div class="text-container">
  <h2 class="name">${name.first} ${name.last}</h2>
  <p class="email">${email}</p>
  <p class="address">${city}</p>
  </div>
  </div>
  `
  });
  gridContainer.innerHTML = employeeHTML;
}

/*================================================================================ */
/*================================================================================ */

//=== MODAL ===//

function displayModal(index) {
  // use object destructuring make our template literal cleaner
  let { name, dob, phone, email, location: { city, street, state, postcode
  }, picture } = employees[index];
  let date = new Date(dob.date);
  const modalHTML = `
  <img class="avatar" src="${picture.large}" />
  <div class="text-container">
  <h2 class="name">${name.first} ${name.last}</h2>
  <p class="email">${email}</p>
  <p class="address">${city}</p>
  <hr />
  <p>${phone}</p>
  <p class="address">${street.number} ${street.name} ${city}, ${state} ${postcode}</p>
  <p>Birthday: 
  ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
</div>
  `;
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
  }
  gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
  });

  modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
  });

  //==== ARROW ====//

  arrowLeft.addEventListener('click', e =>{
    if(modalIndex > 0){
        modalIndex --;
        displayModal(modalIndex)
    } else {
        modalIndex = 11;
        displayModal(modalIndex);
    }
});

arrowRight.addEventListener('click', e =>{
    if(modalIndex < 11){
        modalIndex ++;
        displayModal(modalIndex)
    } else { 
        modalIndex = 0;
        displayModal(modalIndex);
    } 
});
    
//=== Search  ===//

const searchInput = e => {
    const cardEmployee = document.querySelectorAll('h2.name', 'p.email');
    const searchWord = e.target.value.toLowerCase();

    cardEmployee.forEach( cardEmployee => {
        const cardInput = cardEmployee.textContent.toLowerCase();
        const card = cardEmployee.parentElement.parentElement;

        if (cardInput.includes(searchWord)) {
            card.style.display = "";
        } else {
            card.style.display ="none";
        }
    });
}
search.addEventListener('keyup', searchInput);