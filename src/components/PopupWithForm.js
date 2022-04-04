import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__field');
    this._submitButton = this._form.querySelector('.popup__submit');
    this._submitText = this._submitButton.value;
  }

  renderLoading(isLoading) {
    const buttonText = this._submitButton.value;
    if (isLoading) {
      this._submitButton.value = 'Сохранение...';
    } else {
      this._submitButton.value = this._submitText;
    }
  }

  getInputValues() {
    const data = {};
    this._inputList.forEach(input => {
      data[input.name] = input.value;
    });
    return data;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }
  close() {
    this._form.reset();
    super.close();
  }
}