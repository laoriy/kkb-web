import store from "./redux";
// import store from "./redux-toolkit";
// as Store<number, Action<any>>
export interface RootState {
  num: number;
}
export default store;
