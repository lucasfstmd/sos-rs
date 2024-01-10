import React from 'react'

import { RouteObject } from 'react-router'

import Login from '../containers/auth/login'

const AuthRouter: RouteObject[] = [
    {
        path: '/login',
        element: <Login/>
    }
]

export default AuthRouter
