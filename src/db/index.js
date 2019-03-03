import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyCBzNMkY9p5h6jloHtf9qZdEe-64voBmLU",
  authDomain: "deep-six.firebaseapp.com",
  projectId: "deep-six",
};

firebase.initializeApp(config);

export default firebase;
