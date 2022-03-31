export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const formEdit = document.getElementsByName('edit-form')[0];
export const formAdd = document.getElementsByName('add-form')[0];
export const formEditAvatar = document.getElementsByName('edit-avatar-form')[0];
export const photos = document.querySelector('.photos');
export const nameInput = formEdit.querySelector('#name'); 
export const jobInput = formEdit.querySelector('#about');
export const avatar = document.querySelector('.profile__avatar-container');
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__form-input-error_active'
};