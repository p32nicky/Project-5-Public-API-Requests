//API Fetch and Error Handler - Taken from Dog API Example in videos
const modalDiv = document.createElement("div");

function fetchData(url){
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console("Looks like a problem", error))
  }

function checkStatus(response){
  if(response.ok === true){
    return Promise.resolve(response);
  }else{
    return Promise.reject(new Error(response.statusText));
  }
}

let employees = null;
fetchData("https://randomuser.me/api/?results=12")
.then((data) => {
  employees = data.results;

  galleryProfile(employees)
});

//Search Setup
const searchDiv = document.getElementsByClassName("search-container")[0];
const header = document.getElementsByClassName("header-inner-container")[0];

const searchInputs = searchDiv.innerHTML = `
  <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>`;
  header.style.backgroundColor = '#5cdb95';

//Profile Gallery Setup

const cardDiv = document.createElement('div');

const galleryDiv = document.getElementsByClassName("gallery")[0];

function galleryProfile(employees, data){
  employees.forEach(user => {
    modalDiv.className = "modal-container";
    employees.map((person, index) =>{
      console.log(employees);
      cardDiv.setAttribute("class", "card");
      cardDiv.innerHTML = `
      <div class="card" data-id=${index}>
      <div class="card-img-container">
      <img class="card-img" src=${person.picture.large} alt="profile picture">
      </div>
      <div class="card-info-container">
      <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
      <p class="card-text">${person.email}</p>
      <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
      </div>
      </div>`;
      galleryDiv.appendChild(cardDiv);
    })
  })
  return employees;
}

  cardDiv.addEventListener('click', (e) =>{
    callModal(employees);
  });

//Model HTML Setup
function modalHTML(employees){
  return `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${employees.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${employees.name.first} ${employees.name.last} </h3>
                <p class="modal-text">${employees.email}</p>
                <p class="modal-text cap">${employees.location.city}</p>,
                <hr>
                <p class="modal-text">${employees.person}</p>
                <p class="modal-text">${employees.location.street.number} ${employees.location.street.name}, ${employees.location.city}, ${person.location.state} ${person.location.postcode}</p>
                <p class="modal-text">${employees.birthday}</p>
            </div>
        </div>`

}

//Call and Load Modal
function callModal(profile, data){
  const pageBody = document.querySelector("body");

  modalDiv.setAttribute("class", "modal-container");
  modalDiv.setAttribute("id", "modal-container");
  document.body.insertBefore(modalDiv, galleryDiv.nextElementSibling);
  modalDiv.innerHTML = modalHTML(profile);

  const closeButton = document.getElementById("modal-close-btn");
  closeButton.addEventListener("click", (event) => {
    modalDiv.remove();
  });
}

//Event Handlers for Clicks

const searchSubmit = document.getElementById('search-submit');
searchSubmit.addEventListener('click', (e) =>{
});



function employeeSearch(employees){

}
