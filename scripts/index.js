import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popups = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('#edit');
const popupAdd = document.querySelector('#add');
const popupPhoto = document.querySelector('.popup_type_photo');
const bigPhoto = popupPhoto.querySelector('.popup__photo');
const bigPhotoCaption = popupPhoto.querySelector('.popup__photo-caption');
const closeButtons = document.querySelectorAll('.popup__close');
const formEdit = popupEdit.querySelector('.popup__form');
const nameInput = formEdit.querySelector('#name');
const jobInput = formEdit.querySelector('#job');
const formAdd = popupAdd.querySelector('.popup__form');
const placeInput = formAdd.querySelector('#place');
const urlInput = formAdd.querySelector('#url');
const profileName = document.querySelector('.profile__name');
const job = document.querySelector('.profile__description');
const photos = document.querySelector('.photos');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__form-input-error_active'
};

const formEditValidator = new FormValidator(settings, formEdit);
const formAddValidator = new FormValidator(settings, formAdd);

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}

function handleEscape(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}

function handleCloseButton(evt) {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupEdit);
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const item = {};
  item.name = placeInput.value;
  item.link = urlInput.value;
  const newItem = new Card(item, '#card-template');
  const newCard = newItem.createCard();
  photos.prepend(newCard);
  closePopup(popupAdd);
  placeInput.value = "";
  urlInput.value = "";
  formAddValidator.toggleButtonState();
}

formEditValidator.enableValidation();
formAddValidator.enableValidation();

initialCards.forEach((card) => {
  const newItem = new Card(card, '#card-template');
  const newCard = newItem.createCard();
  photos.appendChild(newCard);
});

editButton.addEventListener('click', function () {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;
  formEditValidator.removeErrorMessages();
});

addButton.addEventListener('click', function () {
  openPopup(popupAdd);
});

closeButtons.forEach(function (closeButton) {
  closeButton.addEventListener('click', handleCloseButton);
});

formEdit.addEventListener('submit', handleFormEditSubmit);
formAdd.addEventListener('submit', handleFormAddSubmit);

popups.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.currentTarget === evt.target) {
      closePopup(evt.target);
    }
  });
});

export { openPopup, popupPhoto, bigPhoto, bigPhotoCaption };