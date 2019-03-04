import firebase from "./firebaseConfig";
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

export const deleteFromParentNode = async (parentId, childId) =>
  await firestore
    .collection("nodes")
    .doc(parentId)
    .update({ children: firebase.firestore.FieldValue.arrayRemove(childId) })
    .catch(error => Promise.reject(error));

export const deleteChildNode = async childId =>
  await firestore
    .collection("nodes")
    .doc(childId)
    .delete()
    .catch(error => Promise.reject(error));

export const updateNodeName = async ({ id, name }) =>
  await firestore
    .collection("nodes")
    .doc(id)
    .update({ "name": name })
    .catch(error => Promise.reject(error))