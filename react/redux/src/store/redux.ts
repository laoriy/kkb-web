import { Action, Store } from "redux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
import { createStore, applyMiddleware } from "../lRedux";

//定义state初始化和修改规则,reducer是一个纯函数
function counterReducer(state = 0, action: Action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

function logger() {
  return (dispatch: any) => (action: any) => {
    console.log("执行了" + action.type);
    return dispatch(action);
  };
}

function thunk({ getState }: any) {
  return (dispatch: any) => (action: any) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    } else {
      return dispatch(action);
    }
  };
}
const store = createStore(counterReducer, applyMiddleware(logger, thunk));

export default store;
