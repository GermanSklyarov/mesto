export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }
  getUserInfo() {
    const userData = {};
    userData.name = this._userNameElement.textContent;
    userData.about = this._userInfoElement.textContent;
    return userData;
  }
  setUserInfo({ name, about, avatar, _id }) {
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = about;
    this._userAvatarElement.src = avatar;
    this._userId = _id;

  }
}