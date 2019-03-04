const initialState = {
  data: []
};

const nodes = (state = initialState, { type, payload }) => {
  switch (type) {
    case "UPDATE_NODES_SUCCESS": {
      const { data } = payload;
      return { ...state, data };
    }
    default:
      return state;
  }
};


export default nodes;
