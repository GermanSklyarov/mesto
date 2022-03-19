import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
  editButton,
  addButton,
  formEdit,
  formAdd,
  photos,
  nameInput,
  jobInput,
  initialCards,
  settings } from '../utils/constants.js';

const formEditValidator = new FormValidator(settings, formEdit);
const formAddValidator = new FormValidator(settings, formAdd);
const popupEdit = new PopupWithForm('#edit', handleFormEditSubmit);
const popupAdd = new PopupWithForm('#add', handleFormAddSubmit);
const popupPhoto = new PopupWithImage('.popup_type_photo');
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = createNewCard(item, '#card-template', openImagePopup);
    cardsList.addItem(newCard);
  },
}, '.photos');
const profileInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__description"
});

function openImagePopup(evt) {
  popupPhoto.open(evt.target);
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  const inputValues = popupEdit.getInputValues();
  profileInfo.setUserInfo(inputValues);
  popupEdit.close();
}

function createNewCard(card, templateSelector, openImagePopup) {
  const newItem = new Card(card, templateSelector, openImagePopup);
  const newCard = newItem.createCard();
  return newCard;
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const item = popupAdd.getInputValues();
  const newCard = createNewCard(item, '#card-template', openImagePopup);
  photos.prepend(newCard);
  popupAdd.close();
  formAddValidator.toggleButtonState();
}

formEditValidator.enableValidation();
formAddValidator.enableValidation();

cardsList.renderItems();

editButton.addEventListener('click', function () {
  popupEdit.open();
  const userData = profileInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userInfo;
  formEditValidator.removeErrorMessages();
});

addButton.addEventListener('click', function () {
  formAddValidator.removeErrorMessages();
  popupAdd.open();
});

popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupPhoto.setEventListeners();