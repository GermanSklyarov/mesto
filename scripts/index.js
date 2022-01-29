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
  const newItem = template.cloneNode(true);
  const photo = newItem.querySelector('.photos__photo');
  const likeButton = newItem.querySelector('.photos__like-button');
  const deleteButton = newItem.querySelector('.photos__delete-button');
  photo.src = item.link;
  photo.alt = item.name;
  newItem.querySelector('.photos__photo-title').textContent = item.name;
  likeButton.addEventListener('click', handleLikeButton);
  deleteButton.addEventListener('click', handleDeleteButton);
  photo.addEventListener('click', openPopupPhoto);
  return newItem;
}

function renderItem(item) {
  const newItem = cloneItem(item);
  photos.appendChild(newItem);
}

function handleLikeButton(evt) {
  evt.target.classList.toggle('photos__like-button_active');
}

function handleDeleteButton(evt) {
  evt.target.closest('li').remove();
}

function openPopupPhoto(evt) {
  openPopup(popupPhoto);
  bigPhoto.src = evt.target.src;
  bigPhoto.alt = evt.target.alt;
  bigPhotoCaption.textContent = evt.target.alt;
}

for (let i = 0; i <= 5; i++) {
  renderItem(initialCards[i]);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
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
  if (!placeInput.value || !urlInput.value) {
    closePopup(popupAdd);
    return;
  }
  item.name = placeInput.value;
  item.link = urlInput.value;
  const newItem = cloneItem(item);
  photos.prepend(newItem);
  closePopup(popupAdd);
  placeInput.value = "";
  urlInput.value = "";
}

editButton.addEventListener('click', function () {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;
});
addButton.addEventListener('click', function () {
  openPopup(popupAdd);
});
closeButtons.forEach(function (closeButton) {
  closeButton.addEventListener('click', handleCloseButton);
});
formEdit.addEventListener('submit', handleFormEditSubmit);
formAdd.addEventListener('submit', handleFormAddSubmit);