import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXQkjFqmf5c_FkKI6vJE8ammnx_FA5ti4",
  authDomain: "signal-clone-smash.firebaseapp.com",
  projectId: "signal-clone-smash",
  storageBucket: "signal-clone-smash.appspot.com",
  messagingSenderId: "981116111282",
  appId: "1:981116111282:web:6b9da15428df13bb44bcab",
};

let app;

/* check if firebase app has not been previously initialised */
if (firebase.app.length === 0) {
  /* initialise the app */
  app = firebase.initializeApp(firebaseConfig);
} else {
  /* provide initialised app */
  app = firebase.app();
}

/* set up db access variable */
const db = app.firestore();

/* set up auth access variable */

const auth = app.auth();

export { db, auth };
