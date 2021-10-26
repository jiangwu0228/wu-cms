export class Storage {
  get token() {
    return localStorage.getItem("myAuth");
  }
}

export const storage = new Storage();

export default storage;
