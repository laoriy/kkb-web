import React, { useEffect } from "react";
import store from "../store/";

const ReduxPage = () => {
  const [_ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);
  useEffect(() => {
    store.subscribe(() => {
      console.log("state发生变化了");
      forceUpdate();
    });
  }, []);
  return (
    <div>
      <h3>ReduxPage</h3>
      <p>{store.getState()}</p>
      <button onClick={() => store.dispatch({ type: "ADD" })}>add</button>
      <button onClick={() => store.dispatch({ type: "MINUS" })}>minus</button>
    </div>
  );
};
export default ReduxPage;
