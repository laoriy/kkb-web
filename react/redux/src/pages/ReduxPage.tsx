import React, { useEffect } from "react";
import store from "../store";
import { countAdd, countMinus } from "../store/slices/count";

const ReduxPage = () => {
  const [_ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);
  useEffect(() => {
    store.subscribe(() => {
      console.log("state发生变化了");
      forceUpdate();
    });
  }, []);

  const asyncAdd = () => {
    //@ts-ignore
    store.dispatch((dispatch: any) => {
      setTimeout(() => {
        dispatch({ type: "ADD" });
      }, 1000);
    });
  };
  const asyncAdd2 = () => {
    //@ts-ignore
    store.dispatch((dispatch) => {
      setTimeout(() => {
        dispatch(countAdd());
      }, 1000);
    });
  };
  return (
    <div>
      <h3>ReduxPage</h3>
      {/* <p>{store.getState()}</p> */}
      <button onClick={() => store.dispatch({ type: "ADD" })}>add</button>
      <button onClick={() => store.dispatch({ type: "MINUS" })}>minus</button>
      <button onClick={asyncAdd}>asyncAdd</button>
      <h3>ReduxTooltip</h3>
      <p>{store.getState().countReducer}</p>
      <button onClick={() => store.dispatch(countAdd())}>add</button>
      <button onClick={() => store.dispatch(countMinus())}>minus</button>
      <button onClick={asyncAdd2}>asyncAdd2</button>
    </div>
  );
};
export default ReduxPage;
