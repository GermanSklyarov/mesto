let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let form = document.querySelector('.popup__container');
let nameInput = form.querySelector('#name');
let jobInput = form.querySelector('#job');
let profileName = document.querySelector('.profile__name');
let job = document.querySelector('.profile__description');
let likeButtons = document.querySelectorAll('.photos__like-button');

function popupClose() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;
})
closeButton.addEventListener('click', popupClose)
form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupClose();
})

for (let i=0; i<likeButtons.length; i++) {
  let likeButton = likeButtons[i];
  likeButtons[i].addEventListener('click', function() {
    likeButton.classList.toggle('photos__like-button_active');
  })
}