export default class Card {
  constructor({ link, name, likes, _id }, templateSelector, handleCardClick, handleDeleteButton, handleLike, isOwner, userId) {
    this._src = link;
    this._name = name;
    this._likes = likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton.bind(this);
    this._handleLikeButton = handleLike;
    this._isOwner = isOwner;
    this.id = _id;
    this._userId = userId;
  }

  checkLike() {
    return this._likes.some((obj) => obj._id === this._userId);
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
    this._element.id = this.id;
    this._cardImage = this._element.querySelector('.photos__photo');
    this._likeButton = this._element.querySelector('.photos__like-button');
    this._likeCounter = this._element.querySelector('.photos__like-counter');
    this._deleteButton = this._element.querySelector('.photos__delete-button');
    this._setEventListeners();
    if (!this._isOwner) {
      this._deleteButton.remove();
    }
    if (this.checkLike()) {
      this._likeButton.classList.add('photos__like-button_active');
    }

    this._cardImage.src = this._src;
    this._cardImage.alt = this._name;
    this._element.querySelector('.photos__photo-title').textContent = this._name;
    this._likeCounter.textContent = this._likes.length;

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton(this);
    });
    this._deleteButton.addEventListener('click', this._handleDeleteButton);
    this._cardImage.addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });
  }

  toggleLike(res) {
    this._likes = res.likes;
    this._likeButton.classList.toggle('photos__like-button_active');
    this._likeCounter.textContent = res.likes.length;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}