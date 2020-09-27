import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCOSV3UMjWSrT5WML_SUaxrrC-knh64WB4",
  authDomain: "instagram-clone-75002.firebaseapp.com",
  databaseURL: "https://instagram-clone-75002.firebaseio.com",
  projectId: "instagram-clone-75002",
  storageBucket: "instagram-clone-75002.appspot.com",
  messagingSenderId: "823562119308",
  appId: "1:823562119308:web:c049fb01217aea2b5873a9",
  measurementId: "G-4ECGJ7SK1J",
});

const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, auth, storage };
