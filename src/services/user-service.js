import { showErrorMsg, showSuccessMsg } from "./event-bus.service";
import { utilService } from "./util.service";

export const userService = {
  createUsers,
  getLoggedInUser,
  doLogin,
  doLogout,
};

const STORAGE_KEY = "loggedInUser";
let users;

function createUsers() {
  users = utilService.loadFromStorage("users") || [
    {
      username: "admin",
      password: "admin123",
      isAdmin: true,
    },
    {
      username: "user",
      password: "user123",
      isAdmin: false,
    },
  ];
  utilService.saveToStorage("users", users);
  return users;
}

function getLoggedInUser() {
  return utilService.loadFromStorage(STORAGE_KEY);
}

function doLogin(userName, password) {
  var currUser = users.find((user) => userName === user.username);

  if (password === currUser.password) {
    currUser.lastLoginTime = new Date().getTime();
    utilService.saveToStorage(STORAGE_KEY, currUser);
    showSuccessMsg('login Successfull')
    return currUser;
  } else {
    showErrorMsg('Username or password invalid')
  }
  return null;
}

function doLogout() {
  utilService.saveToStorage(STORAGE_KEY, null);
  showSuccessMsg('logout Successfull')

}
