import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import {
  editButton,
  addButton,
  avatar,
  settings
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '4588134f-24e5-4a54-922a-18acc57b02a3',
    'Content-Type': 'application/json'
  }
}
);

const formValidators = {};
const popupEdit = new PopupWithForm('#edit', handleFormEditSubmit);
const popupEditAvatar = new PopupWithForm('#edit-avatar', handleFormEditAvatarSubmit);
const popupAdd = new PopupWithForm('#add', handleFormAddSubmit);
const popupConfirm = new PopupWithForm('#confirm', handleFormConfirmSubmit);
const popupPhoto = new PopupWithImage('.popup_type_photo');
const profileInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__description",
  userAvatarSelector: ".profile__avatar"
});
const cardsList = new Section(
  (item) => {
    const isOwner = (api.userId === item.owner._id) ? true : false;
    const newCard = createNewCard(item, '#card-template', openImagePopup, handleDeleteButton, handleLike, isOwner, api.userId);
    cardsList.addItem(newCard);
  }, '.photos');

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

function openImagePopup(evt) {
  popupPhoto.open(evt.target);
}

function handleFormEditSubmit(evt) {
  popupEdit.renderLoading(true);
  evt.preventDefault();
  const inputValues = popupEdit.getInputValues();
  api.setUserInfo(inputValues)
    .then((result) => {
      profileInfo.setUserInfo(result);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEdit.renderLoading(false);
    });
}

function createNewCard(card, templateSelector, openImagePopup, handleDeleteButton, handleLike, isOwner, userId) {
  const newItem = new Card(card, templateSelector, openImagePopup, handleDeleteButton, handleLike, isOwner, userId);
  const newCard = newItem.createCard();
  return newCard;
}

function handleFormAddSubmit(evt) {
  popupAdd.renderLoading(true);
  evt.preventDefault();
  const item = popupAdd.getInputValues();
  api.addNewCard(item)
    .then((result) => {
      const newCard = createNewCard(result, '#card-template', openImagePopup, handleDeleteButton, handleLike, true, api.userId);
      cardsList.prependItem(newCard);
      popupAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAdd.renderLoading(false);
    });
}

function handleFormConfirmSubmit(evt) {
  evt.preventDefault();
  api.deleteCard(popupConfirm.card.id)
    .then(() => {
      popupConfirm.card.remove();
      popupConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    })
}

function handleFormEditAvatarSubmit(evt) {
  popupEditAvatar.renderLoading(true);
  evt.preventDefault();
  const url = popupEditAvatar.getInputValues();
  api.setUserAvatar(url.avatar)
    .then((result) => {
      profileInfo.setUserInfo(result);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
}

function handleDeleteButton(evt) {
  popupConfirm.card = evt.target.closest('li');
  popupConfirm.open();
}

function handleLike(card) {
  if (this.checkLike()) {
    api.removeLike(card.id)
      .then((result) => {
        card.toggleLike(result);
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    api.addLike(card.id)
      .then((result) => {
        card.toggleLike(result);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

enableValidation(settings);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    profileInfo.setUserInfo(userData);
    api.userId = userData._id;
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

avatar.addEventListener('click', () => {
  formValidators['edit-avatar-form'].removeErrorMessages();
  popupEditAvatar.open();
})

editButton.addEventListener('click', function () {
  popupEdit.open();
  const userData = profileInfo.getUserInfo();
  popupEdit.setInputValues(userData);
  formValidators['edit-form'].removeErrorMessages();
});

addButton.addEventListener('click', function () {
  formValidators['add-form'].removeErrorMessages();
  popupAdd.open();
});

popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupPhoto.setEventListeners();
popupConfirm.setEventListeners();
popupEditAvatar.setEventListeners();