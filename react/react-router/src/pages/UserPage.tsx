import { useCallback } from "react";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/modules/user";

export function UserPage() {
  const dispatch = useAppDispatch();
  const logoutFn = useCallback(() => dispatch(logout()), []);

  return (
    <div>
      <h3>UserPage</h3>
      <button onClick={logoutFn}>退出登录</button>
    </div>
  );
}
