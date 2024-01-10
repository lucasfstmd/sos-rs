import React from 'react'
import { Location, NavigateFunction, UIMatch, useLocation, useMatches, useNavigate } from 'react-router-dom'

export interface IComponentRouter {
    readonly navigate: NavigateFunction
    readonly location: Location
    readonly match: UIMatch
}

export const withRouter = (Component: any) => {
    return (props: any) => {
        const navigate = useNavigate()
        const location = useLocation()
        const matches = useMatches()
        const match: UIMatch | undefined = matches.length ? matches[0] : undefined
        return (
            <Component {...props} navigate={navigate} location={location} match={match}/>
        )
    }
}
