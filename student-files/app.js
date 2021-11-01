const searchContainer = document.querySelector('.search-container');
const searchHTML = `
<form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`;
searchContainer.insertAdjacentHTML('beforeend', searchHTML);

fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json())
  .then(data => {
    renderUser(data.results)
    showModal(data.results)
  });

function renderUser(users) {
  let userHTML = '';
  console.log(users);

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
    `
    userHTML += htmlObject;
  }
  const galleryContainer = document.querySelector('#gallery');
  galleryContainer.insertAdjacentHTML('beforeend', userHTML);
}

function showModal(){

}

const userCard = document.querySelector('.card')

userCard.addEventListener('click', showModal(){
  
}) 


// let htmlObject = `
//   <div class="modal-container">
//     <div class="modal">
//       <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//       <div class="modal-info-container">
//         <img class="modal-img" src="${users[i].picture.large}" alt="profile picture">
//         <h3 id="name" class="modal-name cap">${users[i].name.first} ${users[i].name.last}</h3>
//         <p class="modal-text">${users[i].email}</p>
//         <p class="modal-text cap">${users[i].location.city}</p>
//         <hr>
//         <p class="modal-text">${users[i].phone}</p>
//         <p class="modal-text">${users[i].location.street.number} ${users[i].location.street.name}, ${users[i].location.city}, ${users[i].location.state} ${users[i].location.postcode}</p>
//         <p class="modal-text">Birthday: ${users[i].dob.date}.</p>
//       </div>
//     </div>
//   </div>
// `