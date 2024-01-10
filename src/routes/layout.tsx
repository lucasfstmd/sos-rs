import React, { lazy } from 'react'

import { RouteObject } from 'react-router'

import ProtectRouter from '../components/protect.router'
import Redirect from '../components/redirect'

const Layout = lazy(() => import('../containers/layout'))
const Home = lazy(() => import('../containers/home/home'))
const Menu1 = lazy(() => import('../containers/menu1'))
const Menu2 = lazy(() => import('../containers/menu2'))

const LayoutRouter: RouteObject[] = [
    {
        path: '/',
        element: <Redirect to="/app/home"/>
    },
    {
        path: '/app',
        element: <ProtectRouter private={true}>
            <Layout/>
        </ProtectRouter>,
        children: [
            {
                path: '/app',
                element: <Redirect to="/app/home"/>
            },
            {
                path: '/app/home',
                element: <Home/>
            },
            {
                path: '/app/menu1',
                element: <Menu1/>
            },
            {
                path: '/app/menu2',
                element: <Menu2/>
            }
        ]
    }
]

export default LayoutRouter
