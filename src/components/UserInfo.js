export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
  }
  getUserInfo() {
    const userData = {};
    userData.userName = this._userNameElement.textContent;
    userData.userInfo = this._userInfoElement.textContent;
    return userData;
  }
  setUserInfo({ name, job }) {
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = job;
  }
}