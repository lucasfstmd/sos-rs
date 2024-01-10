import React, { Component, lazy } from 'react'

import { Box, Theme } from '@mui/material'
import { Outlet } from 'react-router-dom'
import withWidth, { isWidthDown, WithWidth } from '@mui/material/Hidden/withWidth'
import { connect } from 'react-redux'
import { createStyles, withStyles, WithStyles } from '@mui/styles'

import { ThemeMode } from '../../material.theme'
import { IComponentRouter, withRouter } from '../../components/with.router'
import { LayoutActions } from '../../store/layout'
import localStorageService from '../../services/local.storage'
import { DRAWER_WIDTH } from '../../components/layout/nav.bar'
import { ApplicationState } from '../../store/root.types'
import { withTranslation, WithTranslation } from 'react-i18next'

const AppBar = lazy(() => import('../../components/layout/app.bar'))
const NavBar = lazy(() => import('../../components/layout/nav.bar'))
const BreadcrumbsComponent = lazy(() => import('../../components/layout/breadcrumb'))
const Footer = lazy(() => import('../../components/layout/footer'))

export const MIN_DESKTOP_WIDTH = 1280

const LayoutStyle = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: '100%',
        backgroundColor: theme.palette.background.default
    }
})

/**
 * @private
 * @property {string} username
 * @property {ThemeMode} themeMode
 * @property {string} breadCrumbLast
 */
interface IProps {
    readonly username: string
    readonly themeMode: ThemeMode
    readonly breadCrumbLast: string
}

/**
 * @private
 * @property {LayoutActions.changeUsername} changeUsername
 */
interface IDispatch {
    changeUsername(username: string): void
}

type IJoinProps = IProps &
    IDispatch &
    IComponentRouter &
    WithStyles<typeof LayoutStyle, true> &
    WithWidth &
    WithTranslation

/**
 * @private
 * @property {boolean} mobileOpen Controls the visibility of the drawer
 * @property {boolean} desktopOpen Controls the visibility of the drawer
 */
interface IState {
    readonly mobileOpen: boolean
    readonly desktopOpen: boolean
}

/**
 * Component that renders the system layout.
 * @component
 * @category Containers
 * @subcategory Layout
 * @property {string} username Name of the logged in user that will appear on the AppBar component
 * @property {ThemeMode} themeMode System theme
 * @property {string} breadCrumbLast System structural navigation
 * @property {LayoutActions.changeUsername} changeUsername Function that changes the username of the AppBar component
 */
class LayoutComponent extends Component<IJoinProps, IState> {
    constructor(props: IJoinProps) {
        super(props)
        /* Initial State  */
        this.state = {
            mobileOpen: false,
            desktopOpen: window.screen.width > MIN_DESKTOP_WIDTH
        }
        /* Bind Context */
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
        this.handleDrawerToggleDesktop = this.handleDrawerToggleDesktop.bind(this)
        this.verifyDataInLocalStorage = this.verifyDataInLocalStorage.bind(this)
    }

    /**
     * It is invoked immediately after a component is assembled (inserted into the tree).
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidmount}
     * @public
     * @returns {void}
     */
    public componentDidMount(): void {
        const { t } = this.props
        document.title = `${t('LAYOUT.HELMET')}`
        this.verifyDataInLocalStorage()
    }

    /**
     * Render method.
     * Triggering method to render the component.
     */
    public render() {
        const {
            classes,
            theme,
            username,
            breadCrumbLast,
            themeMode,
            width
        } = this.props

        const {
            mobileOpen,
            desktopOpen
        } = this.state

        const downMd = isWidthDown('md', width)

        return <React.Fragment>

            <Box
                component="div"
                className={classes.root}>

                <AppBar
                    theme={theme}
                    desktopOpen={desktopOpen}
                    username={username}
                    drawerToggleDesktop={this.handleDrawerToggleDesktop}
                    drawerToggle={this.handleDrawerToggle}/>

                <NavBar
                    mobileOpen={mobileOpen}
                    desktopOpen={desktopOpen}
                    drawerToggle={this.handleDrawerToggle}
                    theme={theme}
                    themeMode={themeMode}
                    closeMobileView={() => this.setState({ mobileOpen: false })}/>

                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    flexGrow={1}
                    style={{ marginLeft: desktopOpen && !downMd ? `${DRAWER_WIDTH}px` : '0px' }}>

                    <Box p={1}>

                        <BreadcrumbsComponent breadCrumbLast={breadCrumbLast}/>

                        <Outlet/>

                    </Box>

                    <Footer/>

                </Box>

            </Box>
        </React.Fragment>
    }

    /**
     * Function that changes drawer visibility on mobile screens
     * @returns {*}
     */
    private handleDrawerToggle(): void {
        const { mobileOpen } = this.state
        this.setState({ mobileOpen: !mobileOpen })
    }

    /**
     * Function that changes drawer visibility on desktop screens
     * @returns {*}
     */
    private handleDrawerToggleDesktop(): void {
        const { desktopOpen } = this.state
        this.setState({ desktopOpen: !desktopOpen })
    }

    /**
     * Function that checks if the data exists within the local storage
     * @returns {void}
     */
    private verifyDataInLocalStorage(): void {
        const { username, changeUsername } = this.props

        const localUsername = localStorageService.getItem('username')

        if (localUsername && !username) {
            changeUsername(localUsername)
        }
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    username: state.layout.username,
    breadCrumbLast: state.layout.breadCrumbLast,
    themeMode: state.layout.themeMode
})

const LayoutWithTranslation: any = withTranslation()(LayoutComponent)

const LayoutWithWidth: any = withWidth()(LayoutWithTranslation)

const LayoutWithStyle: any = withStyles<any>(LayoutStyle, { withTheme: true })(LayoutWithWidth)

const LayoutWithRoute: any = withRouter(LayoutWithStyle)

const Layout: any = connect(mapStateToProps, LayoutActions)(LayoutWithRoute)

export default Layout

