export class formValidator {
  constructor(obj, formElement) {
    this._formSelector = obj.formSelector;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${this._inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._errorClass}`);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${this._inputErrorClass}`);
    errorElement.classList.remove(`${this._errorClass}`);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${this._inactiveButtonClass}`);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(`${this._inactiveButtonClass}`);
      buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(`.${this._inputSelector}`));
    const buttonElement = this._formElement.querySelector(`.${this._submitButtonSelector}`);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}