import { openPopup, popupPhoto, bigPhoto, bigPhotoCaption } from './index.js';
export class Card {
  constructor(item, templateSelector) {
    this._src = item.link;
    this._name = item.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photos__element')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.photos__photo');
    this._likeButton = this._element.querySelector('.photos__like-button');
    this._setEventListeners();

    this._cardImage.src = this._src;
    this._cardImage.alt = this._name;
    this._element.querySelector('.photos__photo-title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._element.querySelector('.photos__delete-button').addEventListener('click', (evt) => {
      this._handleDeleteButton();
    });
    this._cardImage.addEventListener('click', (evt) => {
      this._openPopupPhoto(evt);
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('photos__like-button_active');
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _openPopupPhoto(evt) {
    bigPhoto.src = evt.target.src;
    bigPhoto.alt = evt.target.alt;
    bigPhotoCaption.textContent = evt.target.alt;
    openPopup(popupPhoto);
  }
}