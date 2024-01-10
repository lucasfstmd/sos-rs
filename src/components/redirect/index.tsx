import { Component } from 'react'

import { IComponentRouter, withRouter } from '../with.router'
import Loading from '../layout/loading'

interface IProps extends IComponentRouter {
    readonly to: string
}

class RedirectComponent extends Component<IProps> {

    public render() {
        const { to, navigate } = this.props
        window.setTimeout(() => navigate(to), 0)
        return <Loading/>
    }
}

const Redirect: any = withRouter(RedirectComponent)

export default Redirect
