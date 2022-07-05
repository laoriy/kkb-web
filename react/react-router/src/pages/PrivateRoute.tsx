import { useLocation, Navigate } from "react-router-dom";

type BaseProps = {
  component: JSX.Element;
};

interface Props extends BaseProps {}
export function PrivateRoute(props: Props) {
  const { component } = props;
  const location = useLocation();

  const isLogin = false;
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
