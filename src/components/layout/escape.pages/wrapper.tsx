import React, { Component, ComponentProps, lazy } from 'react'

import { withTranslation, WithTranslation } from 'react-i18next'
import { Box } from '@mui/material'

const Footer = lazy(() => import('../footer'))

/**
 * @private
 * @property {string} title
 */
interface Props {
    readonly title: string
}

type JoinProps = Props & WithTranslation & ComponentProps<any>

/**
 * Component that renders the central component of escape screens.
 * @component
 * @Category Components
 * @subcategory Escape Pages
 * @property {string} title Title of escape page
 */
class WrapperComponent extends Component<JoinProps> {
    /**
     * Method belonging to the component's life cycle, triggered immediately after a component is assembled (inserted in the tree).
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidmount}
     * @return {void}
     */
    public componentDidMount() {
        const { title } = this.props
        document.title = title
    }

    public render() {

        const { children } = this.props

        return <React.Fragment>

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                height="100%">

                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    flexGrow={1}>
                    {children}
                </Box>

                <Footer/>

            </Box>
        </React.Fragment>
    }
}

const Wrapper: any = withTranslation()(WrapperComponent)

export default Wrapper
