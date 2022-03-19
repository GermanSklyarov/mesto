export default class Card {
  constructor({ url, place }, templateSelector, handleCardClick) {
    this._src = url;
    this._name = place;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._element.querySelector('.photos__delete-button').addEventListener('click', () => {
      this._handleDeleteButton();
    });
    this._cardImage.addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('photos__like-button_active');
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }
}