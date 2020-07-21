//API Fetch and Error Handler - Taken from Dog API Example in videos
function fetchData(url){
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console("Houston, Looks like we have a problem", error))
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


//Profile Gallery Setup
const gallery = document.getElementsByClassName("gallery")[0];
function galleryProfile(employees){
let clickedUser = 0;
  employees.forEach(user => {
    clickedUser = user;
    let cardDiv = document.createElement('div');
    cardDiv.className = "card";
    employees.map((person, index) =>{
    //  cardDiv.setAttribute("class", "card");
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
      gallery.append(cardDiv);
      return cardDiv;
    })
    cardDiv.addEventListener('click', (e) =>{
      e.preventDefault();
      callModal(user);
    });
  })

}

//Model HTML Setup
//Used Date.prototype.toLocaleDateString() to fix birthday
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
function callModal(user){
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
                <p class="modal-text">Birthday ${new Date(user.dob.date).toLocaleDateString()}</p>
            </div>
        </div>`
  const modalDiv = document.createElement("div");
  modalDiv.className = "modal-container";
  modalDiv.id = "modal-container";

  const pageBody = document.querySelector("body");
  modalDiv.setAttribute("class", "modal-container");
  modalDiv.innerHTML = windowHTML;
  pageBody.append(modalDiv);

/*Remove the current modal -
I had problems with this for a while as I had my append
modal call in the for each loop of the users, and it would render the background very dark
and wouldn't assign the close button correctly.
*/
document.getElementById('modal-close-btn').addEventListener('click', () => {
  const modal = document.querySelector('.modal-container');
  document.body.removeChild(modalDiv);
  });
}

//Search Setup and check against names listed using h3 textcontent
const searchDiv = document.getElementsByClassName("search-container")[0];
const header = document.getElementsByClassName("header-inner-container")[0];
header.style.backgroundColor = '#5cdb95';

//Search inputs HTML setup
const searchInputs = searchDiv.innerHTML = `
  <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>`;

const searchSubmit = document.getElementById('search-submit');
searchSubmit.addEventListener('click', () => employeeSearch());
function employeeSearch(cardDiv){
  const searchInput = document.getElementById('search-input').value.toString().toLowerCase();
  const cardArray = document.querySelectorAll('.card');

//For some reason when I would console.log nameResult, it would show 24 results, two of each person.
//I couldn't figure out why but it didn't break program so I moved on.
for(let i = 0; i < cardArray.length; i+=1){
    const nameResult = cardArray[i].querySelector('h3').textContent.toString().toLowerCase();
      if(nameResult.match(searchInput)){
        cardArray[i].style.display = '';
      } else {
        cardArray[i].style.display = 'none';

      }if(searchInput === ""){
        alert("Please enter a person and try again.");
        break;
      }
  };

}
