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
fetchData("https://randomuser.me/api/?results=12&nat=us")
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


const galleryDiv = document.getElementsByClassName("gallery")[0];
function galleryProfile(employees, data){

  employees.forEach(user => {
    let cardDiv = document.createElement('div');
    cardDiv.className = "card";
    employees.map((person, index) =>{
      console.log(employees);
      cardDiv.setAttribute("class", "card");
      let cardHTML=  `
      <div class="card" data-id=${index}>
      <div class="card-img-container">
      <img class="card-img" src=${user.picture.large} alt="profile picture">
      </div>
      <div class="card-info-container">
      <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
      <p class="card-text">${user.email}</p>
      <p class="card-text cap">${user.location.city}, ${user.location.state}</p>

      </div>`;
      cardDiv.innerHTML = cardHTML;
      galleryDiv.append(cardDiv);

      cardDiv.addEventListener('click', (e) =>{
        e.preventDefault();
        callModal(user, data);
      });
    })

  })
}

//Model HTML Setup


function callModal(user, data){
  let windowHTML = `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${user.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last} </h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>,
                <hr>
                <p class="modal-text">${user.cell}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                <p class="modal-text">${user.dob.date}</p>
            </div>
        </div>`
  const modalDiv = document.createElement("div");
  modalDiv.className = "modal-container";
  modalDiv.id = "modal-container";

  const pageBody = document.querySelector("body");
  modalDiv.setAttribute("class", "modal-container");
  modalDiv.innerHTML = windowHTML;
  pageBody.append(modalDiv);

  const closeButton = document.getElementById("modal-close-btn");
  closeButton.addEventListener("click", (e) => console.log('test'));

}




const searchSubmit = document.getElementById('search-submit');
searchSubmit.addEventListener('click', (e) =>{
});



function employeeSearch(employees){

}
