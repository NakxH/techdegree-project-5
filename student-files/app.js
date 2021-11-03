
function renderSearch(){
  const searchContainer = document.querySelector('.search-container');
  const searchHTML = `
  <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
  `;
  searchContainer.insertAdjacentHTML('beforeend', searchHTML);
}

function getEmployees(){
  fetch('https://randomuser.me/api/?results=12&nat=gb')
    .then(response => response.json())
    .then(data => {
      renderUser(data.results);
      handleModal(data.results);
      handleSearch(data.results);
    });
};

function renderUser(users) {
  const galleryContainer = document.querySelector('#gallery');
  galleryContainer.innerHTML = '';
  let userHTML = '';

  for(let i = 0; i < users.length; i++){
    let htmlObject = `
      <div class="card">
        <div class="card-img-container">
          <img class="card-img" src="${users[i].picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${users[i].name.first} ${users[i].name.last}</h3>
          <p class="card-text">${users[i].email}</p>
          <p class="card-text cap">${users[i].location.city} ${users[i].location.state}</p>
        </div>
      </div>
    `;
    userHTML += htmlObject;
  };
  
  galleryContainer.insertAdjacentHTML('beforeend', userHTML);
};

function handleModal(users){
  const cards = document.querySelectorAll('.card');
  Array.from(cards).forEach((card, index) => card.addEventListener('click', () => showModal(users, index)));
};

function showModal(users, index){
  const user = users[index];
  let htmlObject = `
    <div class="modal-container">
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
          <img class="modal-img" src="${user.picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="modal-text">${user.email}</p>
          <p class="modal-text cap">${user.location.city}</p>
          <hr>
          <p class="modal-text">${user.cell}</p>
          <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
          <p class="modal-text">Birthday: ${user.dob.date}.</p>
        </div>
      </div>
      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', htmlObject);
  const closeButton = document.querySelector('#modal-close-btn');
  const container = document.querySelector('.modal-container');
  closeButton.addEventListener('click', () => {
    container.remove();
  });

  const prev = document.querySelector('#modal-prev');
  const next = document.querySelector('#modal-next');

  prev.addEventListener('click', () => {
    if(index > 0){
      container.remove();
      showModal(users, index-1);
    }
  });

  next.addEventListener('click', () => {
    if(index < users.length-1){
      container.remove();
      showModal(users, index+1);
    }
  });
};

function handleSearch(users) {
  const searchButton = document.querySelector('.search-submit');
  const searchItem = document.querySelector('#search-input');
  const search = (e) => {
    e.preventDefault();
    const filteredUsers = users.filter(user => {
      const fullName = `${user.name.first} ${user.name.last}`;
      return fullName.toLowerCase().includes(searchItem.value.toLowerCase());
    });
    renderUser(filteredUsers);
    handleModal(filteredUsers);
  };
  searchItem.addEventListener('search', search);
  searchItem.addEventListener('keyup', search);
  searchButton.addEventListener('click', search);
};

renderSearch();
getEmployees();
