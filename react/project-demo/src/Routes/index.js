import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import UserPage from '../pages/UserPage'
import React from "react";

export default function Routes(props) {
    return (
        <Router>
            <Switch>
                <Route path="/" component={HomePage}></Route>
                <Route path="/login" component={LoginPage}></Route>
                <Route path="user" component={UserPage}></Route>
            </Switch>
        </Router>
    )
}