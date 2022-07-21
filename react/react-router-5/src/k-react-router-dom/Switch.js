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

                    React.Children.forEach(children, child => {
                        if (match === null && React.isValidElement(child)) {
                            element = child
                            const { path } = child.props
                            match = path ? matchPath(context.location.pathname, { ...child.props }) : context.match
                        }
                    })
                    return match ? React.cloneElement(element, {}) : null
                }}
            </RouteContext.Consumer>
        )
    }
}
