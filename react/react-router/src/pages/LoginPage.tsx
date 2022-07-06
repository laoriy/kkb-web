import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useSearchParams, Navigate, useLocation } from "react-router-dom";
import { getIsLogin, login } from "../store/modules/user";

export function LoginPage() {
  const [search] = useSearchParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(getIsLogin);
  const loginFn = useCallback(() => dispatch(login()), []);

  if (isLogin) {
    const redirect = search.get("redirect") || "/";
    const { state } = location;
    return <Navigate to={redirect} state={state} replace={true} />;
  } else {
    return (
      <div>
        <h3>LoginPage</h3>
        <button onClick={loginFn}>登录</button>
      </div>
    );
  }
}
