import React, { Component } from 'react'

import authService from '../../../services/auth'
import { DRAWER_WIDTH } from '../nav.bar'
import {
    AppBar,
    Avatar,
    Box,
    Button,
    CircularProgress,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Theme,
    Toolbar,
    Typography
} from '@mui/material'
import { AccountCircle, ExitToApp, Face, Menu as MenuIcon } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import { WithTranslation, withTranslation } from 'react-i18next'

import ThemeButton from '../../../containers/layout/theme.button'
import { IComponentRouter, withRouter } from '../../with.router'
import clsx from 'clsx'

export const UserButton = styled(Button)({
    textTransform: 'none'
})

const Style = (theme: Theme) => createStyles({
    root: {
        height: '48px'
    },
    mobile: {
        transition: '.2s all'
    },
    desktop: {
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH
        },
        transition: '.2s all'
    },
    menuButton: {
        color: 'inherit'
    },
    title: {
        flexGrow: 1
    }
})

/**
 * @private
 * @property {string} avatar
 * @property {string} username
 * @property {boolean} desktopOpen
 */
interface AppBarProps extends WithStyles<typeof Style, true> {
    readonly avatar: string
    readonly username: string
    readonly desktopOpen: boolean
}

/**
 * @private
 * @property {function} drawerToogle
 * @property {function} drawerToggleDesktop
 */
interface IDispatchProps extends IComponentRouter {
    drawerToggle(): void

    drawerToggleDesktop(): void
}

/**
 * @interface IState
 * @private
 * @property {Element} [anchorEl] Controls where the element will appear on the screen when fired from another element
 * @property {boolean} goingOut
 */
interface IState {
    readonly anchorEl: Element | undefined
    readonly goingOut: boolean
}

type IProps = AppBarProps & WithTranslation & IDispatchProps

/**
 * Component that renders the AppBar of the application
 * @component
 * @category Components
 * @subcategory layout
 * @property {string} avatar User avatar
 * @property {string} username User name
 * @property {boolean} desktopOpen System AppBar visibility
 * @property {function} drawerToggle Function that triggers drawer visibility
 * @property {function} drawerToggleDesktop Function that triggers drawer visibility on desktops
 */
class AppBarComponent extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)

        /* Initial State */
        this.state = {
            anchorEl: undefined,
            goingOut: false
        }

        /* Bind Context */
        this.handleClick = this.handleClick.bind(this)
        this.logout = this.logout.bind(this)
        this.profile = this.profile.bind(this)
    }

    /**
     * @public
     * @returns {React.ReactNode} System AppBar rendering
     */
    public render() {

        const {
            classes,
            drawerToggleDesktop,
            desktopOpen,
            t,
            username,
            avatar,
            theme
        } = this.props

        const {
            anchorEl,
            goingOut
        } = this.state

        return <AppBar
            className={
                clsx(
                    classes.root,
                    desktopOpen
                        ? classes.desktop
                        : classes.mobile
                )
            }
            sx={{
                background: theme.palette.primary.main,
                color: theme.palette.background.paper
            }}>

            <Toolbar variant="dense">

                {/*<Box sx={{ display: { xl: 'none', lg: 'none', md: 'none', sm: 'block', xs: 'block' } }}>*/}
                {/*    <IconButton*/}
                {/*        id="btn_toggle_drawer"*/}
                {/*        color="inherit"*/}
                {/*        aria-label="open drawer"*/}
                {/*        edge="start"*/}
                {/*        onClick={drawerToggle}*/}
                {/*        className={classes.menuButton}>*/}
                {/*        <MenuIcon/>*/}
                {/*    </IconButton>*/}
                {/*</Box>*/}


                <Box sx={{ display: { xl: 'block', lg: 'block', md: 'block', sm: 'none', xs: 'none' } }}>
                    <Box style={{ marginLeft: desktopOpen ? `${DRAWER_WIDTH}px` : '10px' }}>
                        <IconButton
                            id="btn_toggle_drawer"
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={drawerToggleDesktop}
                            className={classes.menuButton}>
                            <MenuIcon/>
                        </IconButton>
                    </Box>
                </Box>

                <Typography variant="h6" className={classes.title} noWrap={true}/>

                <ThemeButton color={theme.palette.background.paper}/>

                <Box display="flex" justifyContent="center" alignItems="center">

                    {
                        goingOut
                        && <Box position="absolute" zIndex={1100}>
                            <CircularProgress size={24} color="primary"/>
                        </Box>
                    }

                    <UserButton
                        id="btn_user_logged"
                        color="inherit"
                        onClick={this.handleClick}
                        endIcon={
                            avatar
                                ? <Avatar
                                    src={avatar}
                                    style={{ width: '20px', height: '20px' }}
                                    alt={`${t('DEFAULT.AVATAR')}`}/>
                                :
                                <AccountCircle color="disabled" style={{ color: theme.palette.background.paper }}/>
                        }>
                        {/* The username in the appbar */}
                        {username || '...'}
                    </UserButton>
                </Box>

                {/* Menu opens within a popover after clicking the user in the appbar */}
                <Menu
                    id="menu_user_logged"
                    anchorEl={anchorEl}
                    keepMounted={true}
                    open={Boolean(anchorEl)}
                    onClose={() => this.handleClick(null)}>
                    <MenuItem
                        id="menu_item_profile"
                        onClick={() => {
                            this.handleClick(null)
                            this.profile()
                        }}>
                        <ListItemIcon>
                            <Face fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit" noWrap={true}>
                            {t('APP_BAR.PROFILE')}
                        </Typography>
                    </MenuItem>
                    {/* Application button logout */}
                    <MenuItem
                        id="menu_item_logout"
                        onClick={() => {
                            this.handleClick(null)
                            this.logout()
                        }}>
                        <ListItemIcon>
                            <ExitToApp fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit" noWrap={true}>
                            {t('APP_BAR.EXIT')}
                        </Typography>
                    </MenuItem>
                </Menu>

            </Toolbar>
        </AppBar>
    }

    /**
     * Function that triggers the popover component and where it should appear
     * @param {any} event Event that triggers the popover component
     * @returns {void} void
     */
    private handleClick(event: any): void {
        this.setState({ anchorEl: event?.currentTarget })
    }

    /**
     * Function that triggers the logout of the application and redirects the user to the login screen
     * @async
     * @returns {Promise<void>} Promise<void>
     */
    private async logout(): Promise<void> {
        this.setState({ goingOut: true })
        authService.logout()
        window.location.reload()
    }

    /**
     * Function that redirects the user to the profile screen
     * @returns {void} void
     */
    private profile(): void {
        this.props.navigate(`/app/myprofile`)
    }

}

const AppBarTranslation = withTranslation()(AppBarComponent)

const AppBarWithStyle = withStyles(Style)(AppBarTranslation)

export default withRouter(AppBarWithStyle)
