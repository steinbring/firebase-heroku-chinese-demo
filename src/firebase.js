import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "< value from https://console.firebase.google.com/ goes here >",
  authDomain: "< value from https://console.firebase.google.com/ goes here >",
  databaseURL: "< value from https://console.firebase.google.com/ goes here >",
  projectId: "< value from https://console.firebase.google.com/ goes here >",
  storageBucket: "< value from https://console.firebase.google.com/ goes here >",
  messagingSenderId: "< value from https://console.firebase.google.com/ goes here >",
  appId: "< value from https://console.firebase.google.com/ goes here >",
  measurementId: "< value from https://console.firebase.google.com/ goes here >"
};

firebase.initializeApp(firebaseConfig);

export default firebase.database();
