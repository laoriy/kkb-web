import { useCallback } from "react";
import { ConnectedProps, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../store";
import { countAdd, countMinus } from "../store/slices/count";
import { connect, bindActionCreators } from "../lReactRedux";
interface BaseProps {
  color: string;
}
/**
 *
 * @param state
 * @param ownProps 组件本身的props
 * @returns
 */
const mapState = (state: RootState, ownProps: BaseProps) => {
  //   console.log(ownProps, "ownProps"); // 只要指定了ownProps ，不管有没有使用，props变化都会进行调用mapState函数
  console.log("execute mapState--");

  return {
    num: state,
  };
};

// const mapDispatchToProps = (dispatch: Dispatch, ownProps: BaseProps) => {
//   //  // 只要指定了ownProps ，不管有没有使用，props变化都会进行调用mapState函数
//   console.log("execute mapDispatch~");

//   return {
//     add: () => dispatch({ type: "ADD" }),
//     minus: () => dispatch({ type: "MINUS" }),
//   };
// };

/**
 * 上面手动加dispatch也可以通过bindActionCreators进行处理
 */
// const mapDispatchToProps = (dispatch: Dispatch) => {
//   let res = {
//     add: () => ({ type: "ADD" }),
//     minus: () => ({ type: "MINUS" }),
//   };
//   res = bindActionCreators(res, dispatch);

//   return {
//     ...res,
//   };
// };
const mapDispatchToProps = {
  add: () => ({ type: "ADD" }),
  minus: () => ({ type: "MINUS" }),
};
/**
 * 如果省略mapDispatchToProps这个参数，则dispatch会注入到props中。
 */
const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux, BaseProps {}
const ReactReduxPage = (props: Props) => {
  const { add, num, minus, color } = props;

  return (
    <div style={{ color }}>
      <h3>ReactReduxPage</h3>
      <p>{num}</p>
      <button onClick={add}>add</button>
      <button onClick={minus}>minus</button>
    </div>
  );
};

export default connector(ReactReduxPage);

// const ReactReduxPage = (props: BaseProps) => {
//   const dispatch = useDispatch();
//   const num: any = useSelector((state: any) => state.count);
//   console.log(num);
//   const add = useCallback(() => dispatch(countAdd()), []);
//   const minus = useCallback(() => dispatch(countMinus()), []);
//   const { color } = props;
//   return (
//     <div style={{ color }}>
//       <h3>ReactReduxPage</h3>
//       <p>{num}</p>
//       <button onClick={add}>add</button>
//       <button onClick={minus}>minus</button>
//     </div>
//   );
// };
// export default ReactReduxPage;
