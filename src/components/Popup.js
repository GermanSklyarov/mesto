export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
    this._handleEscClose = this._handleEsc.bind(this);
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEsc(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close()
    });
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close();
      }
    });
  }
}