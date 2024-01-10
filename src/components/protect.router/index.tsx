import React, { Component, ComponentProps } from 'react'

import authService from '../../services/auth'
import Redirect from '../redirect'

interface IProps extends ComponentProps<any> {
    readonly private: boolean
}

class ProtectRouterComponent extends Component<IProps> {
    public render() {
        const { children } = this.props
        const authenticate: boolean = authService.isAuthenticated()
        return authenticate ? children : <Redirect to="/login"/>
    }
}

const ProtectRouter: any = ProtectRouterComponent

export default ProtectRouter
