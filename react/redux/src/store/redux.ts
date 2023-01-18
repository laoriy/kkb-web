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
  return (next: any) => (action: any) => {
    console.log("执行了" + action.type);
    return next(action);
  };
}

function thunk({ getState }: any) {
  return (next: any) => (action: any) => {
    if (typeof action === "function") {
      return action(next, getState);
    } else {
      return next(action);
    }
  };
}
const store = createStore(counterReducer, applyMiddleware(logger, thunk));

export default store;
