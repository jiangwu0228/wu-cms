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
    if (typeof window !== 'undefined')
    return localStorage.getItem("myToken");
  }

  get role() {
    if (typeof window !== 'undefined')
    return localStorage.getItem("myRole");
  }

  get userId() {
    if (typeof window !== 'undefined')
    return localStorage.getItem("myId");
  }
}

export const storage = new Storage();

export default storage;
