export function createStore(reducer: any, enhancer: any) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState: any = undefined;
  let currentListeners: any[] = [];
  function getState() {
    return currentState;
  }
  function dispatch(action: any) {
    currentState = reducer(currentState, action);
    currentListeners.map((listener) => listener());
  }
  /**
   * 订阅，可以多次订阅
   */
  function subscribe(listener: any) {
    // 每次订阅，把回调放入数组
    currentListeners.push(listener);
  }
  // 取值的时候保证不和项目中的重复
  dispatch({ type: "@INIT/REDUX-L" });
  return {
    getState,
    dispatch,
    subscribe,
  };
}

export function compose(...funcs: any[]) {
  if (funcs.length === 0) {
    return (arg: any) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args: any[]) =>
        a(b(...args))
  );
}

export function applyMiddleware(...middlewares: any[]) {
  return (createStore: any) =>
    (...args: any[]) => {
      const store = createStore(...args);
      let dispatch = store.dispatch;
      const middleApi = {
        getState: store.getState,
        dispatch: (...args: any[]) => dispatch(...args),
      };
      // 给middleware 参数，比如说dispatch
      const middlewaresChain = middlewares.map((middleware) =>
        middleware(middleApi)
      );
      dispatch = compose(...middlewaresChain)(dispatch);

      return {
        ...store,
        // 覆盖上面store中的dispatch
        dispatch,
      };
    };
}
