import React, { lazy } from 'react'

import { RouteObject } from 'react-router'

import ProtectRouter from '../components/protect.router'
import Redirect from '../components/redirect'

const Layout = lazy(() => import('../containers/layout'))
const Home = lazy(() => import('../containers/map/Map'))
const List = lazy(() => import('../containers/list'))

const LayoutRouter: RouteObject[] = [
    {
        path: '/',
        element: <Redirect to="/app/map"/>
    },
    {
        path: '/app',
        element: <ProtectRouter private={true}>
            <Layout/>
        </ProtectRouter>,
        children: [
            {
                path: '/app',
                element: <Redirect to="/app/map"/>
            },
            {
                path: '/app/map',
                element: <Home/>
            },
            {
                path: '/app/list',
                element: <List/>
            }
        ]
    }
]

export default LayoutRouter
