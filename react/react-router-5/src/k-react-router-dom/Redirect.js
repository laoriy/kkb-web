import React, { Component } from 'react'
import { RouteContext } from './RouteContext'

export default class Redirect extends Component {
    render() {
        const { to } = this.props
        return (
            <RouteContext.Consumer>
                {
                    context => {
                        const { history } = context
                        return <LifeCycle onMount={() => {
                            history.push(to)
                        }} />

                    }
                }
            </RouteContext.Consumer >
        )
    }
}

class LifeCycle extends Component {
    componentDidMount() {
        if (this.props.onMount) {
            this.props.onMount()
        }
    }
    render() {
        return (
            null
        )
    }
}

