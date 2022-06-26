import { useCallback } from "react";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { countAdd, countMinus } from "../store/slices/count";
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
  console.log("ff");

  return {
    num: state,
  };
};

const mapDispatch = () => {
  // 只要props 变化了就会调用mapDispatch，即使没有指定ownProps
  return {
    add: () => ({ type: "ADD" }),
    minus: () => ({ type: "MINUS" }),
  };
};

const connector = connect(mapState, mapDispatch);
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
