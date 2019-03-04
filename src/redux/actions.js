import uuidv4 from "uuid/v4";
import * as firebaseApi from "../db/firebaseApi";
import requestWrapper from "../utils/requestWrapper";

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
  firebaseApi.firebaseListener(successCb, failureCb);
};

export const addNode = parentId =>
  requestWrapper("ADD_NODE", async () => {
    const newChild = { id: uuidv4(), parent: parentId };
    await firebaseApi.addToParentNode(parentId, newChild.id);
    await firebaseApi.createNewNode(newChild);
  });

export const deleteNode = ({ node, batchDelete }) =>
  requestWrapper("DELETE_NODE", async () => {
    if (!batchDelete) {
      await firebaseApi.deleteFromParentNode(node.parent, node.id);
    }
    await firebaseApi.deleteChildNode(node.id);
  });

export const updateName = ({ id, name }) =>
  requestWrapper("UPDATE_NAME", async () => {
    await firebaseApi.updateNodeName({ id, name });
  });
