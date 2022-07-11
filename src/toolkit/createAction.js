

export default function createAction(type, prepareAction) {
  function actionCreator(...args) {
    if(prepareAction) {
      let prepared = prepareAction(...args);
      console.log(prepared);
      return {
        type,
        ...prepared,
      }
    }

    return {
      type,
      payload: args[0],
    }
  }
  actionCreator.type = type;
  return actionCreator;
}