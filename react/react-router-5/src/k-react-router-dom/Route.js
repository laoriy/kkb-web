import React, { Component } from "react";
import { matchPath } from "react-router-dom";
import { RouteContext } from "./RouteContext";

export default class Route extends Component {
    render() {
        const {
            path,
            component,
            children,
            render,
            location: _location,
        } = this.props;

        return (
            <RouteContext.Consumer>
                {(context) => {
                    // const match = context.location.pathname === path
                    const location = _location || context.location;
                    const match = matchPath(location.pathname, this.props);

                    const props = {
                        ...context,
                        location,
                        match,
                    };

                    // match 渲染children, component, render 或者null
                    // match的时候如果children存在：function或者children本身
                    // 不match children 或者 null
                    // children是和匹配无关
                    return <RouteContext.Provider value={props}>
                        {
                            match
                                ? children
                                    ? typeof children === "function"
                                        ? children(props)
                                        : children
                                    : component
                                        ? React.createElement(component, props)
                                        : render
                                            ? render(props)
                                            : null
                                : typeof children === "function"
                                    ? children(props)
                                    : null
                        }
                    </RouteContext.Provider>
                    // return match ? React.createElement(component, this.props) : null
                }}
            </RouteContext.Consumer>
        );
    }
}
