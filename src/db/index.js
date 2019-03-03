import firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCBzNMkY9p5h6jloHtf9qZdEe-64voBmLU",
  authDomain: "deep-six.firebaseapp.com",
  databaseURL: "https://deep-six.firebaseio.com",
  projectId: "deep-six",
  storageBucket: "deep-six.appspot.com",
  messagingSenderId: "1037025533804"
};

firebase.initializeApp(config);

const firestore = firebase.firestore();

export default firestore;
