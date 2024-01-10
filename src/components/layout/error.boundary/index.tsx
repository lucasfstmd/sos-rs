import React, { Component, ComponentProps, ErrorInfo } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'

import { Typography } from '@mui/material'

type IProps = WithTranslation & ComponentProps<any>

/**
 * @private
 * @property {*} error
 * @property {*} errorInfo
 */
interface State {
    readonly error: any
    readonly errorInfo: any
}

/**
 * Component that renders an error on the screen if it happens.
 * @component
 * @category Components
 * @subcategory Error
 * @property {*} error
 * @property {*} errorInfo
 */
class ErrorBoundaryComponent extends Component<IProps, State> {

    constructor(props: IProps) {
        super(props)
        this.state = { error: null, errorInfo: null }
    }

    /**
     * This lifecycle is invoked after an error has been thrown by a descendant component.
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidcatch}
     * @public
     * @param error The bug that was released.
     * @param errorInfo An object with a componentStack key containing information about which component threw the error.
     */
    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({ error, errorInfo })
        // You can also log error messages to an error reporting service here
        console.error('Error: ', error)
        console.error('ErrorInfo: ', errorInfo)
        // logErrorToMyService(error, errorInfo)
    }

    /**
     * @public
     * @returns {React.ReactNode} Render system errors on the page, if any.
     */
    public render() {
        const { t, children } = this.props
        const { error, errorInfo } = this.state
        if (error || errorInfo) {
            // Error path
            return <React.Fragment>

                <Typography variant="h6" noWrap={true}>{t('ERROR.TITLE')}</Typography>

                <details style={{ whiteSpace: 'pre-wrap' }}>
                    {error?.toString()}
                    <br/>
                    {errorInfo?.componentStack}
                </details>

            </React.Fragment>
        }
        // Normally, just render children
        return children
    }
}

const ErrorBoundary: any = withTranslation()(ErrorBoundaryComponent)

export default ErrorBoundary
