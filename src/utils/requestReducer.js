const initialState = {
  name: "",
  isFetching: false,
  error: ""
};

const requestHandler = (state = initialState, { type, payload }) => {
  switch (type) {
    case "REQUEST": {
      const { name } = payload;
      return { ...state, name, isFetching: true, error: "" };
    }
    case "SUCCESS": {
      const { name } = payload;
      return { ...state, name, isFetching: false, error: "" };
    }
    case "FAILURE": {
      const { name, error } = payload;
      console.log({ failure: name, error });
      return { ...state, name, error, isFetching: false };
    }
    default:
      return state;
  }
};

export default requestHandler;
