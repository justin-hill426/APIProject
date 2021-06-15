let personData = [];
getData('https://randomuser.me/api/?exc=login&results=12&nat=us');

/**
* Dynamically create the layouts for the search, gallery, and modal
**/
function createHTMLLayout(data) {
  createSearch();
  personData = data.results;
  createGallery(data.results,'');
}

/**
* Dynamically create the search functionality according to the mockup
**/
function createSearch() {
  const search = document.querySelector('.search-container');
  search.insertAdjacentHTML('beforeend', `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
  `);
  const searchInput = document.querySelector('#search-input');
  searchInput.addEventListener('keyup', e => {
    createGallery(personData, e.target.value)
  });
}

/**
* Dynamically add the gallery layout
**/
function createGallery(personResults, searchQuery) {
  const gallery = document.querySelector('#gallery');
  const cards = document.querySelectorAll('.card');
  if(cards.length > 0) {
    cards.forEach((card, i) => {
      gallery.removeChild(card);
    });
  }
  personResults.forEach((person, i) => {
    let personName = person.name.first + " " + person.name.last;
    if(personName.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery.trim().length === 0) {
      gallery.insertAdjacentHTML('beforeend', `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${person.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${personName}</h3>
                <p class="card-text">${person.email}</p>
                <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
            </div>
        </div>
      `);
    }
  });
  const profiles = document.querySelectorAll('.card')
  profiles.forEach((profile, i) => {
    profile.addEventListener('click', e => {
      displayModal(i);
    });
  });
}

/**
* Get the necessary data from the API
* @param {string} url - url to be opened
**/
async function getData(url) {
  fetch(url)
  .then(async data => await data.json())
  .then(data => createHTMLLayout(data))
  .catch(error => document.querySelector('body').innerHTML = 'There was an error');
}

  /**
 * Display the modal of a the person who was clicked
 * @param {array} data - the data of the person that was clicked on (from the API)
 */
function displayModal(indexNumber) {
  const person = personData[indexNumber];
  const gallery = document.querySelector('#gallery');
  gallery.insertAdjacentHTML('afterend', `
  <div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${person.picture.large}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
              <p class="modal-text">${person.email}</p>
              <p class="modal-text cap">${person.location.city}</p>
              <hr>
              <p class="modal-text">${person.cell}</p>
              <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
              <p class="modal-text">Birthday: ${reformatDate(person.dob.date.substring(0,10))}</p>
          </div>
      </div>
      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
  </div>
  `);
  const modalCloseBtn = document.querySelector('#modal-close-btn');
  //remove modal
  modalCloseBtn.addEventListener('click', () => {
    removeModalButton();
  });

  const modalPreviousButton = document.querySelector('#modal-prev');
  modalPreviousButton.addEventListener('click', () => {
    indexNumber--;
    if(indexNumber == -1) {
      indexNumber = personData.length - 1;
    }
    removeModalButton();
    displayModal(indexNumber);
  });
  const modalNextButton = document.querySelector('#modal-next');
  modalNextButton.addEventListener('click', () => {
    indexNumber++;
    if(indexNumber == personData.length) {
      indexNumber = 0;
    }
    removeModalButton();
    displayModal(indexNumber);
  });
}

/**
* Remove modal currently on the screen
*/
function removeModalButton() {
  const modalContainer = document.querySelector('div.modal-container');
  modalContainer.parentElement.removeChild(modalContainer);
}

  /**
 * Find a the key corresponding to the keyboard input
 * @param {string} date the date string from the parsed data
 * @return {button} the button that has the same textContent as the input key
 */
 function reformatDate(date) {
   //FIXME- use capture groups to reformat the date
   const regex = /([0-9]+)-([0-9]+)-([0-9]+)/;
   const match = date.match(regex);
   return match[2] + "/" + match[3] + "/" + match[1];
 }
