import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AuthRouter from './auth'
import LayoutRouter from './layout'
import AccessDenied from '../components/layout/escape.pages/access.denied'
import NotFound from '../components/layout/escape.pages/not.found'
import InternalError from '../components/layout/escape.pages/internal.error'

const router: any = createBrowserRouter([
    ...AuthRouter,
    ...LayoutRouter,
    {
        path: '/access_denied',
        element: <AccessDenied/>
    },
    {
        path: '/not_found',
        element: <NotFound/>
    },
    {
        path: '/internal_error',
        element: <InternalError/>
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router
