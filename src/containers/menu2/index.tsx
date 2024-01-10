import React, { Component } from 'react'
import { Typography } from '@mui/material'
import { withTranslation, WithTranslation } from 'react-i18next'

class Menu2Component extends Component<WithTranslation> {
    /**
     * Method belonging to the component's life cycle, triggered immediately after a component is assembled (inserted in the tree).
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidmount}
     * @return {void}
     */
    public componentDidMount() {
        const { t } = this.props
        document.title = `${t('MENU2.HELMET')}`
    }

    /**
     * Render method.
     * Triggering method to render the component.
     * @return {JSX.Element} Component to be rendered.
     */
    public render() {
        return <React.Fragment>

            <Typography>
                Menu 1 works!
            </Typography>

        </React.Fragment>

    }
}

const Menu2: any = withTranslation()(Menu2Component)

export default Menu2
