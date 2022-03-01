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
    this._setEventListeners();

    this._element.querySelector('.photos__photo').src = this._src;
    this._element.querySelector('.photos__photo').alt = this._name;
    this._element.querySelector('.photos__photo-title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.photos__like-button').addEventListener('click', (evt) => {
      this._handleLikeButton(evt);
    });
    this._element.querySelector('.photos__delete-button').addEventListener('click', (evt) => {
      this._handleDeleteButton(evt);
    });
    this._element.querySelector('.photos__photo').addEventListener('click', (evt) => {
      this._openPopupPhoto(evt);
    });
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle('photos__like-button_active');
  }

  _handleDeleteButton(evt) {
    evt.target.closest('li').remove();
  }

  _openPopupPhoto(evt) {
    openPopup(popupPhoto);
    bigPhoto.src = evt.target.src;
    bigPhoto.alt = evt.target.alt;
    bigPhotoCaption.textContent = evt.target.alt;
  }
}