//@flow
function actionCreator(type: string, payload: any = null) {
  return { type, payload }
}

export default actionCreator;
