import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._bigPhoto = this._popup.querySelector('.popup__photo');
    this._bigPhotoCaption = this._popup.querySelector('.popup__photo-caption');
  }
  open(card) {
    this._bigPhoto.src = card.src;
    this._bigPhoto.alt = card.alt;
    this._bigPhotoCaption.textContent = card.alt;
    super.open();
  }
}