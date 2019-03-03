import uuidv4 from "uuid/v4";
import {
  firebaseListener,
  addToParentNode,
  createNewNode,
  deleteFromParentNode,
  deleteChildNode
} from "./firebaseHelper";

export const setupDbListener = () => dispatch => {
  const successCb = data =>
    dispatch({
      type: "UPDATE_NODES_SUCCESS",
      payload: { data }
    });
  const failureCb = error =>
    dispatch({
      type: "UPDATE_NODES_FAILURE",
      payload: { error }
    });
  firebaseListener(successCb, failureCb);
};

export const addNode = parentId => async dispatch => {
  dispatch({ type: "ADD_NODE_REQUEST" });
  try {
    const newChild = { id: uuidv4(), name: "New", parent: parentId };
    await addToParentNode(parentId, newChild.id);
    await createNewNode(newChild);
    dispatch({ type: "ADD_NODE_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "ADD_NODE_FAILURE",
      payload: { error }
    });
  }
};

export const deleteNode = ({ node, batchDelete }) => async dispatch => {
  dispatch({ type: "DELETE_NODE_REQUEST" });
  try {
    if (!batchDelete) await deleteFromParentNode(node.parent, node.id);
    await deleteChildNode(node.id);
    dispatch({ type: "DELETE_NODE_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "DELETE_NODE_FAILURE",
      payload: { error }
    });
  }
};
