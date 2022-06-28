import { createContext, FC, useContext } from "react";
import { Connect } from "react-redux";
const StoreProvider = createContext({});

type ProviderProps = {
  children: JSX.Element;
  store: any;
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
    return () => {
      //@ts-ignore
      const { dispatch, getState } = useContext(StoreProvider);
      const stateProps = mapState(getState());
      const dispatchs = mapDispatch(dispatch);
      console.log(stateProps);

      const dispatchProps = { dispatch };
      const props = {
        ...dispatchProps,
        ...stateProps,
        ...dispatchs,
      };
      return <WrapperComponent {...props} />;
    };
  };
