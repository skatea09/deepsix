import firestore from '../db';

export const setupRealtimeNodes = userId => async dispatch => firestore
  .collection('nodes')
  .onSnapshot(
    (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => doc.data());
      dispatch({
        type: 'UPDATE_NODES_SUCCESS',
        payload: { data },
      });
      return {};
    },
    (err) => {
      dispatch({
        type: 'UPDATE_NODES_FAILURE',
        payload: err,
      });
      return Promise.reject(err);
    },
  );
