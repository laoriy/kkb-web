import { useAppSelector } from "../store/hooks";
import { useLocation, Navigate } from "react-router-dom";
import { getIsLogin } from "../store/modules/user";

type BaseProps = {
  component: JSX.Element;
};

interface Props extends BaseProps {}
export function PrivateRoute(props: Props) {
  const { component } = props;
  const location = useLocation();

  const isLogin = useAppSelector(getIsLogin);
  if (isLogin) {
    // 已登录
    return component;
  } else {
    // 跳转登录
    const { pathname, search, state } = location;
    const _search = `redirect=${pathname + search}`;
    return (
      <Navigate
        to={{ pathname: "/login", search: _search }}
        state={state}
        replace={true}
      />
    );
  }
}
