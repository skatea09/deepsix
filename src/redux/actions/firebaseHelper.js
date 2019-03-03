import firebase from "../../db";
const firestore = firebase.firestore();

export const firebaseListener = (success, failure) =>
  firestore.collection("nodes").onSnapshot(
    querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      success(data);
    },
    err => {
      failure(err);
    }
  );

export const addToParentNode = async (parentId, newChildId) =>
  await firestore
    .collection("nodes")
    .doc(parentId)
    .update({ children: firebase.firestore.FieldValue.arrayUnion(newChildId) })
    .catch(error => Promise.reject(error));

export const createNewNode = async newChild =>
  await firestore
    .collection("nodes")
    .doc(newChild.id)
    .set(newChild)
    .catch(error => Promise.reject(error));
