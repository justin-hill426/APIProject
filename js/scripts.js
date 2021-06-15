getData('https://randomuser.me/api/?exc=login&results=12');


//Constants


//Listeners








/**
* Dynamically create the layouts for the search, gallery, and modal
**/
function createHTMLLayout(data) {
  createSearch();
  createGallery(data.results);
  //createModal();
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
}

/**
* Dynamically add the gallery layout
**/
function createGallery(personResults) {
  const gallery = document.querySelector('#gallery');
  console.log(personResults);
  personResults.forEach((person, i) => {
    gallery.insertAdjacentHTML('beforeend', `
      <div class="card">
          <div class="card-img-container">
              <img class="card-img" src="${person.picture.large}" alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
              <p class="card-text">${person.email}</p>
              <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
          </div>
      </div>
    `);
  });
  const profiles = document.querySelectorAll('.card')
  profiles.forEach((profile, i) => {
    profile.addEventListener('click', e => {
      displayModal(personResults[i]);
    });
  });


}

/**
*
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
function displayModal(data) {
  const gallery = document.querySelector('#gallery');
  gallery.insertAdjacentHTML('afterend', `
  <div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${data.picture.large}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
              <p class="modal-text">${data.email}</p>
              <p class="modal-text cap">${data.location.city}</p>
              <hr>
              <p class="modal-text">${data.cell}</p>
              <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
              <p class="modal-text">Birthday: ${data.dob.date.substring(0,10).match(/([0-9]+)-([0-9]+)-([0-9]+)/)}</p>
          </div>
      </div>
      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
  </div>
  `);
}

  /**
 * Find a the key corresponding to the keyboard input
 * @param {string} date the date string from the parsed data
 * @return {button} the button that has the same textContent as the input key
 */
 function reformatDate(date) {
   //FIXME- use capture groups to reformat the date
 }
