import firebase from "firebase";
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6TCSjrB5C6CEcl_Jd3K5cUXQTxjBPuOg",
  authDomain: "todo-app-bc2e7.firebaseapp.com",
  projectId: "todo-app-bc2e7",
  storageBucket: "todo-app-bc2e7.appspot.com",
  messagingSenderId: "757383658507",
  appId: "1:757383658507:web:86bdf22c521385a5c69b0e",
  measurementId: "G-QNSBB1CE8P"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore = firebaseApp.firestore();
// Initialize Firebase
export default firestore;
