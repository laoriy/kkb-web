import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";

const mapState = (state: RootState) => ({
  num: state.num,
});

const mapDispatch = {
  add: () => ({ type: "ADD" }),
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  backgroundColor: string;
}
const ReactReduxPage = (props: Props) => {
  const { add, num } = props;
  return (
    <div>
      <h3>ReactReduxPage</h3>
      <p>{num}</p>
      <button onClick={add}>add</button>
    </div>
  );
};

export default connector(ReactReduxPage);
