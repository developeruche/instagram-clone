import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC_W7EWg8z6bzNBNXa1sboexr25E4RrtvY",
  authDomain: "instagram-clone-c5bfb.firebaseapp.com",
  databaseURL: "https://instagram-clone-c5bfb.firebaseio.com",
  projectId: "instagram-clone-c5bfb",
  storageBucket: "instagram-clone-c5bfb.appspot.com",
  messagingSenderId: "402711244976",
  appId: "1:402711244976:web:0044125fb21d83f2568b75",
  measurementId: "G-WGHE0E59NW",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
