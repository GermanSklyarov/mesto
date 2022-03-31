export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }
  getUserInfo() {
    const userData = {};
    userData.userName = this._userNameElement.textContent;
    userData.userInfo = this._userInfoElement.textContent;
    return userData;
  }
  setUserInfo({ name, about }) {
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = about;
  }
  setAvatar(avatar) {
    this._userAvatarElement.src = avatar;
  }
}