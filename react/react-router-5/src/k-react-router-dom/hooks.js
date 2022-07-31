import React from 'react'
import { RouteContext } from './RouteContext'
// useContext取到的value来自最近的Provider
export function useParams() {
    const match = React.useContext(RouteContext).match
    return match ? match.params : {}
}

export function useHistory() {
    return React.useContext(RouteContext).history
}

export function useLocation() {
    return React.useContext(RouteContext).location
}