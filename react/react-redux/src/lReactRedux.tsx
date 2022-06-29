import { createContext, FC, useContext, useEffect, useState } from "react";
import { Connect } from "react-redux";
const StoreProvider = createContext({});

type ProviderProps = {
  children: JSX.Element;
  store: any;
};

export const bindActionCreators = <T extends Record<string, any>>(
  actions: T,
  dispatch: any
) => {
  const keys = Object.keys(actions);
  let res: { [key in keyof T]: T[keyof T] } = {} as {
    [key in keyof T]: T[keyof T];
  };
  keys.forEach((key: keyof T) => {
    res[key] = (() => dispatch(actions[key]())) as T[keyof T];
  });
  return res;
};

export const Provider: FC<ProviderProps> = (props) => {
  return (
    <StoreProvider.Provider value={props.store}>
      {props.children}
    </StoreProvider.Provider>
  );
};
export const connect: Connect =
  //@ts-ignore
  (mapState, mapDispatch) => (WrapperComponent) => {
    //@ts-ignore
    return (_props) => {
      //@ts-ignore
      const { dispatch, getState, subscribe } = useContext(StoreProvider);
      const [props, setProps] = useState({});
      const dispatchProps = { dispatch };

      const update = () => {
        const stateProps = mapState(getState());
        let dispatches: any;
        if (typeof mapDispatch === "function") {
          dispatches = mapDispatch(dispatch);
        } else if (typeof mapDispatch === "object") {
          dispatches = { ...bindActionCreators(mapDispatch, dispatch) };
        } else {
          dispatches = { dispatch };
        }

        setProps({ ...dispatchProps, ...stateProps, ...dispatches, ..._props });
      };
      useEffect(() => {
        update();
        const unsubscribe = subscribe(() => {
          update();
        });
        return () => {
          unsubscribe();
        };
      }, [_props]);

      return <WrapperComponent {...props} />;
    };
  };
