import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { IComponentRouter } from '../../components/with.router'
import { createStyles, WithStyles } from '@mui/styles'
import { WithWidth } from '@mui/material/Hidden/withWidth'
import { Box, Theme } from '@mui/material'
import MapPage from '../../components/map'

const LayoutStyle = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: '100%',
        backgroundColor: theme.palette.background.default
    },
    containerMap: {
        width: '100vw',
        height: '98vh'
    }
})

type IJoinProps =
    IComponentRouter &
    WithWidth &
    WithStyles<typeof LayoutStyle, true> &
    WithTranslation

class HomeComponent extends Component<IJoinProps> {

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: IJoinProps) {
        super(props)
    }

    /**
     * Method belonging to the component's life cycle, triggered immediately after a component is assembled (inserted in the tree).
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidmount}
     * @return {void}
     */
    public componentDidMount() {
        const { t } = this.props
        document.title = `${t('HOME.HELMET')}`
    }
    /**
     * @public
     * @returns {React.ReactNode} Login screen for the user to authenticate to the system
     */
    public render() {
        return <React.Fragment>
            <MapPage/>
        </React.Fragment>
    }
}

const Home: any = withTranslation()(HomeComponent)

export default Home
