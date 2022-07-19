import React, { Component } from 'react'
import { RouteContext } from './RouteContext'

export default class Route extends Component {
    render() {
        const { path, component } = this.props

        return (
            <RouteContext.Consumer>
                {context => {
                    const match = context.location.pathname === path
                    return match ? React.createElement(component, this.props) : null
                }}
            </RouteContext.Consumer>
        )
    }
}
