const reducers = [];

export default (previousState, action) => {
  return reducers.map(reducer => {
    return reducer(previousState, action);
  }).reduce((a, b) => {
    return Object.assign({}, a, b);
  },previousState);
};
