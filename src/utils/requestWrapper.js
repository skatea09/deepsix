export default (name, cb) => async dispatch => {
  dispatch({ type: 'REQUEST', payload: { name } });
  try {
    await cb();
    dispatch({ type: 'SUCCESS', payload: { name } });
  } catch (error) {
    dispatch({ type: 'FAILURE', payload: { name, error } });
  }
};
