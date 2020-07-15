//API Fetch and Error Handler - Taken from Dog API Example in videos

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

function galleryProfile(employees){

  employees.map((person, index) =>{
      console.log(employees);
    galleryDiv.appendChild(cardDiv);
    cardDiv.setAttribute("class", "card");


    cardDiv.innerHTML = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src=${person.picture.large} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${person.name.first}, ${person.name.last}</h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>
    </div>`;

    cardDiv.style.backgroundColor = '05386b';
  })
  return employees;
}
//Model Setup
function callModal(employees){ //profile
  return `  <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${person.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last} </h3>
                <p class="modal-text">${person.email}</p>
                <p class="modal-text cap">${person.location.city}</p>,
                <hr>
                <p class="modal-text">${person.person}</p>
                <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                <p class="modal-text">${person.birthday}</p>
            </div>
        </div>`
}

//Event Handlers for Clicks

const searchSubmit = document.getElementById('search-submit');
searchSubmit.addEventListener('click', (e) =>{
});

cardDiv.addEventListener('click', (e) =>{
});

function employeeSearch(employees){

}
