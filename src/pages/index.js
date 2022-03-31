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
  formEdit,
  formAdd,
  formEditAvatar,
  photos,
  nameInput,
  jobInput,
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

const formEditValidator = new FormValidator(settings, formEdit);
const formAddValidator = new FormValidator(settings, formAdd);
const formEditAvatarValidator = new FormValidator(settings, formEditAvatar);
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

function openImagePopup(evt) {
  popupPhoto.open(evt.target);
}

function handleFormEditSubmit(evt) {
  const button = formEdit.querySelector('.popup__submit');
  const buttonText = button.value;
  button.value = 'Сохранение...';
  evt.preventDefault();
  const inputValues = popupEdit.getInputValues();
  api.setUserInfo(inputValues)
    .then((result) => {
      profileInfo.setUserInfo(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.value = buttonText;
      popupEdit.close();
    });
}

function createNewCard(card, templateSelector, openImagePopup, handleDeleteButton, handleLike, isOwner) {
  const newItem = new Card(card, templateSelector, openImagePopup, handleDeleteButton, handleLike, isOwner);
  const newCard = newItem.createCard();
  return newCard;
}

function handleFormAddSubmit(evt) {
  const button = formAdd.querySelector('.popup__submit');
  const buttonText = button.value;
  button.value = 'Сохранение...';
  evt.preventDefault();
  const item = popupAdd.getInputValues();
  api.addNewCard(item)
    .then((result) => {
      const newCard = createNewCard(result, '#card-template', openImagePopup, handleDeleteButton, handleLike, true);
      photos.prepend(newCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.value = buttonText;
      popupAdd.close();
      formAddValidator.toggleButtonState();
    });
}

function handleFormConfirmSubmit(evt) {
  evt.preventDefault();
  api.deleteCard(popupConfirm.card.id);
  popupConfirm.card.remove();
  popupConfirm.close();
}

function handleFormEditAvatarSubmit(evt) {
  const button = formEditAvatar.querySelector('.popup__submit');
  const buttonText = button.value;
  button.value = 'Сохранение...';
  evt.preventDefault();
  const url = popupEditAvatar.getInputValues();
  api.setUserAvatar(url.avatar)
    .then((result) => {
      profileInfo.setAvatar(result.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.value = buttonText;
      popupEditAvatar.close();
    });
}

function handleDeleteButton(evt) {
  popupConfirm.card = evt.target.closest('li');
  popupConfirm.open();
}

function handleLike(cardId) {
  if (this._likeButton.classList.contains('photos__like-button_active')) {
    api.removeLike(cardId)
      .then((result) => {
        this._likeCounter.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    api.addLike(cardId)
      .then((result) => {
        this._likeCounter.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
  }
  this._likeButton.classList.toggle('photos__like-button_active');
}

formEditValidator.enableValidation();
formAddValidator.enableValidation();
formEditAvatarValidator.enableValidation();

api.getUserInfo()
  .then((result) => {
    profileInfo.setUserInfo(result);
    profileInfo.setAvatar(result.avatar);
    api.userId = result._id;
  })
  .catch((err) => {
    console.log(err);
  });

api.getInitialCards()
  .then((result) => {
    const cardsList = new Section({
      items: result,
      renderer: (item) => {
        const isOwner = (api.userId === item.owner._id) ? true : false;
        const newCard = createNewCard(item, '#card-template', openImagePopup, handleDeleteButton, handleLike, isOwner);
        cardsList.addItem(newCard);
      },
    }, '.photos');
    cardsList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

avatar.addEventListener('click', () => {
  formEditAvatarValidator.removeErrorMessages();
  popupEditAvatar.open();
})

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
popupConfirm.setEventListeners();
popupEditAvatar.setEventListeners();