export default (name, cb) => async dispatch => {
  dispatch({ type: `${name}_REQUEST` });
  try {
    await cb();
    dispatch({ type: `${name}_SUCCESS` });
  } catch (error) {
    dispatch({ type: `${name}_FAILURE`, payload: { error } });
  }
};
