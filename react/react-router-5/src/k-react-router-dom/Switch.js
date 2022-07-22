import React, { Component } from 'react'
import { matchPath } from 'react-router-dom';
import { RouteContext } from './RouteContext'

export default class Switch extends Component {
    render() {
        return (
            <RouteContext.Consumer>
                {context => {
                    let element, match = null;
                    const { children } = this.props
                    // 优先用props上的location
                    const location = this.props.location || context.location
                    React.Children.forEach(children, child => {
                        if (match === null && React.isValidElement(child)) {
                            element = child
                            const { path } = child.props
                            match = path ? matchPath(location.pathname, { ...child.props }) : context.match
                        }
                    })
                    return match ? React.cloneElement(element, { location }) : null
                    // 404 待定
                }}
            </RouteContext.Consumer>
        )
    }
}
