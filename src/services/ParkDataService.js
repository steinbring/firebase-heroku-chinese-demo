import firebase from "../firebase";

const db = firebase.ref("/parks");

class ParkDataService {
  getAll() {
    return db;
  }

  create(park) {
    return db.push(park);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new ParkDataService();
