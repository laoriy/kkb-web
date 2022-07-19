import React, { Component } from 'react'
import { RouteContext } from './RouteContext';

export default class Link extends Component {
    handleClick = (event, history) => {
        event.preventDefault();
        history.push(this.props.to)
    }
    render() {
        const { to, children } = this.props
        return (
            <RouteContext.Consumer>{
                context => {
                    return <a href={to} onClick={(e) => this.handleClick(e, context.history)}>{children}</a>
                }
            }</RouteContext.Consumer>
        )
    }
}
