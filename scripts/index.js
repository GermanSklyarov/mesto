const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
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
const template = document.querySelector('#card-template').content;
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

function cloneItem(item) {
  let newItem = template.cloneNode(true);
  let photo = newItem.querySelector('.photos__photo');
  photo.src = item.link;
  photo.alt = item.name;
  newItem.querySelector('.photos__photo-title').textContent = item.name;
  return newItem;
}

function renderItem(item) {
  let newItem = cloneItem(item);
  photos.appendChild(newItem);
}

function likeButtonHandler(evt) {
  evt.target.classList.toggle('photos__like-button_active');
}

function deleteButtonHandler(evt) {
  evt.target.closest('li').remove();
}

function popupPhotoOpen(evt) {
  popupOpen(popupPhoto);
  bigPhoto.src = evt.target.src;
  bigPhoto.alt = evt.target.alt;
  bigPhotoCaption.textContent = evt.target.alt;
}

for (let i = 0; i <= 5; i++) {
  renderItem(initialCards[i]);
  let likeButton = photos.querySelectorAll('.photos__like-button')[i];
  let deleteButton = photos.querySelectorAll('.photos__delete-button')[i];
  let photo = photos.querySelectorAll('.photos__photo')[i];
  likeButton.addEventListener('click', likeButtonHandler);
  deleteButton.addEventListener('click', deleteButtonHandler);
  photo.addEventListener('click', popupPhotoOpen);
}

function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

function popupOpen(popup) {
  popup.classList.add('popup_opened');
}

function closeButtonHandler(evt) {
  let popup = evt.target.closest('.popup');
  popupClose(popup);
}

function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupClose(popupEdit);
}

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  let item = {};
  if (!placeInput.value || !urlInput.value) {
    popupClose(popupAdd);
    return;
  }
  item.name = placeInput.value;
  item.link = urlInput.value;
  let newItem = cloneItem(item);
  photos.prepend(newItem);
  let likeButton = photos.querySelector('.photos__like-button');
  let deleteButton = photos.querySelector('.photos__delete-button');
  let photo = photos.querySelector('.photos__photo');
  likeButton.addEventListener('click', likeButtonHandler);
  deleteButton.addEventListener('click', deleteButtonHandler);
  photo.addEventListener('click', popupPhotoOpen);
  popupClose(popupAdd);
  placeInput.value = "";
  urlInput.value = "";
}

editButton.addEventListener('click', function () {
  popupOpen(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;
});
addButton.addEventListener('click', function () {
  popupOpen(popupAdd);
});
closeButtons.forEach(function (closeButton) {
  closeButton.addEventListener('click', closeButtonHandler);
});
formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);