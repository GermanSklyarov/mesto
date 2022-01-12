let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let form = document.querySelector('.popup__form');
let nameInput = form.querySelector('#name');
let jobInput = form.querySelector('#job');
let profileName = document.querySelector('.profile__name');
let job = document.querySelector('.profile__description');

function popupClose() {
  popup.classList.remove('popup_opened');
}

function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupClose();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
form.addEventListener('submit', formSubmitHandler);