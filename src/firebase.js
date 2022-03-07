import firebase from 'firebase'

 const firebaseConfig = {
  apiKey: "AIzaSyBCcUTL3-XZDUa53iPYpI5qDEEzCpQUlj4",
  authDomain: "ajlpvg.firebaseapp.com",
  projectId: "ajlpvg",
  storageBucket: "ajlpvg.appspot.com",
  messagingSenderId: "98672851060",
  appId: "1:98672851060:web:4faf024eebe6e71ee0f921",
  measurementId: "G-3XLDFD2D1B"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();
export default db;
export {auth,provider};