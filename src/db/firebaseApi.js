import firebase from "./firebaseConfig";
const firestore = firebase.firestore();

const ref = firestore.collection("nodes");
const handleError = (error) => Promise.reject(error);

export const firebaseListener = (success, failure) =>
  ref.onSnapshot(
    querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      success(data);
    },
    err => {
      failure(err);
    }
  );

export const addToParentNode = async (parentId, newChildId) =>
  await ref
    .doc(parentId)
    .update({ children: firebase.firestore.FieldValue.arrayUnion(newChildId) })
    .catch(handleError);

export const createNewNode = async newChild =>
  await ref
    .doc(newChild.id)
    .set(newChild)
    .catch(handleError);

export const deleteFromParentNode = async (parentId, childId) =>
  await ref
    .doc(parentId)
    .update({ children: firebase.firestore.FieldValue.arrayRemove(childId) })
    .catch(handleError);

export const deleteChildNode = async childId =>
  await ref
    .doc(childId)
    .delete()
    .catch(handleError);

export const updateNodeName = async ({ id, name }) =>
  await ref
    .doc(id)
    .update({ name: name })
    .catch(handleError);
