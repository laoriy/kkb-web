
import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
export default connect(({ user }) => ({ user }), {
    // login: userInfo => ({ type: "loginSaga", payload: userInfo })

    login: userInfo => ({ type: "LOGIN_SUCCESS", payload: userInfo })
    // login: userInfo => dispatch => {
    //     loginAction(dispatch, userInfo);
    //     dispatch({ type: "LOGIN_REQUEST" }); //展示loading
    //     // 去login请求
    //     setTimeout(() => {
    //         dispatch({ type: "LOGIN_SUCCESS", payload: userInfo });
    //     }, 1000);
    // }
})(
    function LoginPage(props) {
        const [name, setName] = useState('')
        const { login, user, location } = props;
        const { isLogin, loading, err, tip } = user;
        if (isLogin) {
            const { redirect = "/" } = location.state || {};
            return <Redirect to={redirect} />;
        }
        return (
            <BasicLayout
                title="登录"
                _className="loginPage"
                shortIcon="https://gw.alicdn.com/tfs/TB1OIxTcLc3T1VjSZLeXXbZsVXa-183-144.png?getAvatar=1">
                <h3>LoginPage</h3>
                <input
                    type="text"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                <p className="red">{err.msg}</p>
                <button onClick={() => login({ name })}>
                    {loading ? "登录中..." : "登录"}
                </button>
                <p className="green">{tip.msg}</p>
            </BasicLayout>
        );
    }
)
