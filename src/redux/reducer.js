const initialState = {
  data: []
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "UPDATE_NODES_SUCCESS": {
      const { data } = payload;
      return Object.assign({}, state, { data });
    }

    default:
      return state;
  }
};

export default rootReducer;
