import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import UserPage from '../pages/UserPage'
import React from "react";
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
const routes = [
    {
        path: "/",
        title: "首页",
        props: { exact: true },
        component: HomePage
    },
    {
        path: "/login",
        title: "登录",
        component: LoginPage
    },
    {
        path: "/user",
        title: "用户中心",
        component: UserPage
    }
];
export default function Routes(props) {
    return (
        <Router>
            <Route routes={routes} component={TopBar} />
            <Route component={BottomNav} />
            <Switch>
                <Route path="/" exact component={HomePage}></Route>
                <Route path="/login" component={LoginPage}></Route>
                <Route path="/user" component={UserPage}></Route>
            </Switch>
        </Router>
    )
}