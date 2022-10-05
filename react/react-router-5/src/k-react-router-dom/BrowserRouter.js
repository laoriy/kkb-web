import React, { Component } from 'react'
import { createBrowserHistory } from 'history'
import { RouteContext } from './RouteContext'
export default class BrowserRouter extends Component {
    static computeRootMatch(pathname) {
        return {
            path: '/',
            url: '/',
            params: '/',
            isExact: pathname === '/',
        }
    }
    constructor(props) {
        super(props)
        this.history = createBrowserHistory()
        this.state = {
            location: this.history.location
        }
        this.unListen = this.history.listen(location => {
            this.setState({
                location
            })
        })


    }
    componentWillUnmount() {
        if (this.unListen) {
            this.unListen()
        }
    }
    render() {

        return (
            <RouteContext.Provider value={{ history: this.history, location: this.state.location, match: BrowserRouter.computeRootMatch(this.state.location.pathname) }}>{this.props.children}</RouteContext.Provider>
        )
    }
}
