import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { UserPage } from "./UserPage";

export function RouterPage() {
  return (
    <div>
      <h3>RouterPage</h3>
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        {/* Route一定要包裹在Router之内 */}
        <Routes>
          <Route path="/">
            <Route path="/search/:id" element={<HomePage />}>
              <Route path="detail" element={<HomePage />}></Route>
            </Route>
          </Route>
          <Route path="/user" element={<UserPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="*" element={<div>404</div>}></Route>
        </Routes>
      </Router>
    </div>
  );
}
