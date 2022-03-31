export default class Card {
  constructor({ link, name, likes, _id }, templateSelector, handleCardClick, handleDeleteButton, handleLike, isOwner) {
    this._src = link;
    this._name = name;
    this._likes = likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeButton = handleLike.bind(this);
    this._isOwner = isOwner;
    this._id = _id;
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
    this._element.id = this._id;
    this._cardImage = this._element.querySelector('.photos__photo');
    this._likeButton = this._element.querySelector('.photos__like-button');
    this._likeCounter = this._element.querySelector('.photos__like-counter');
    this._deleteButton = this._element.querySelector('.photos__delete-button');
    this._setEventListeners();
    if (!this._isOwner) {
      this._deleteButton.remove();
    }

    this._cardImage.src = this._src;
    this._cardImage.alt = this._name;
    this._element.querySelector('.photos__photo-title').textContent = this._name;
    this._likeCounter.textContent = this._likes;

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton(this._id);
    });
    this._deleteButton.addEventListener('click', this._handleDeleteButton);
    this._cardImage.addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}