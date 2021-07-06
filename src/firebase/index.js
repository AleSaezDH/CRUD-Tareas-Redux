import firebase from 'firebase/app';
import  '@firebase/firestore';

var firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDmg4smgR01vidKhZrTUGNUmNrngmht6BQ",
    authDomain: "organizador-de-tareas-69d6d.firebaseapp.com",
    projectId: "organizador-de-tareas-69d6d",
    storageBucket: "organizador-de-tareas-69d6d.appspot.com",
    messagingSenderId: "235386377056",
    appId: "1:235386377056:web:061049f39243c2e10e0405"
  });

export function getFirestore(){
    return firebase.firestore(firebaseConfig);
}

/*export function dataTime () {
  return firebase.firestore.FieldValue.serverTimestamp();
}*/

const db = getFirestore();

export default db;