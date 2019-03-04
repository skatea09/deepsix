import uuidv4 from "uuid/v4";
import {
  firebaseListener,
  addToParentNode,
  createNewNode,
  deleteFromParentNode,
  deleteChildNode,
  updateNodeName
} from "../../db/firebaseApi";
import requestWrapper from "./requestWrapper";

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
  dispatch(
    requestWrapper("ADD_NODE", async () => {
      const newChild = { id: uuidv4(), parent: parentId };
      await addToParentNode(parentId, newChild.id);
      await createNewNode(newChild);
    })
  );
};

export const deleteNode = ({ node, batchDelete }) => async dispatch => {
  dispatch(
    requestWrapper("DELETE_NODE", async () => {
      if (!batchDelete) await deleteFromParentNode(node.parent, node.id);
      await deleteChildNode(node.id);
    })
  );
};

export const updateName = ({ id, name }) => async dispatch => {
  dispatch(
    requestWrapper("UPDATE_NAME", async () => {
      await updateNodeName({ id, name });
    })
  );
};
