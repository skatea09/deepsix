const initialState = {
  data: []
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "UPDATE_NODES_SUCCESS": {
      const { data } = payload;
      return Object.assign({}, state, { data });
    }
    case "FETCH_NODES_REQUEST":
    case "ADD_NODE_REQUEST":
    case "REMOVE_NODE_REQUEST":
      return Object.assign({}, state, { isFetching: true, error: "" });
    case "ADD_NODE_SUCCESS":
    case "REMOVE_NODE_SUCCESS": {
      return Object.assign({}, state, { isFetching: false, error: "" });
    }
    case "ADD_NODE_FAILURE":
    case "REMOVE_NODE_FAILURE": {
      const { error } = payload;
      return Object.assign({}, state, { isFetching: false, error });
    }
    default:
      return state;
  }
};

export default rootReducer;
