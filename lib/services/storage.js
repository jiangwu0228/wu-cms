export class Storage {
  key = "cms";

  setUserInfo(info) {
    localStorage.setItem("myToken", info.token);
    localStorage.setItem("myRole", info.role);
    localStorage.setItem("myId", info.userId);
  }

  deleteUserInfo() {
    localStorage.removeItem("myToken");
    localStorage.removeItem("myRole");
    localStorage.removeItem("myId");
  }

  get token() {
    return localStorage.getItem("myToken");
  }

  get role() {
    return localStorage.getItem("myRole");
  }

  get userId() {
    return localStorage.getItem("myId");
  }


}

export const storage = new Storage();

export default storage;
