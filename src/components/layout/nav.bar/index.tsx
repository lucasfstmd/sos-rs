import React, { Component, ForwardedRef, forwardRef } from 'react'

import { WithTranslation, withTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'

import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Drawer,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Theme,
    Tooltip
} from '@mui/material'
import { createStyles, makeStyles, WithStyles, withStyles } from '@mui/styles'
import { Dashboard, Home, Menu } from '@mui/icons-material'
import { ThemeMode } from '../../../material.theme'

import LogoLight from '../../../assets/imgs/logo_light.png'
import LogoDark from '../../../assets/imgs/logo_dark.png'

import { IComponentRouter, withRouter } from '../../with.router'
import clsx from 'clsx'

const navLinkStyle = makeStyles((theme: Theme) => ({
    active: {
        backgroundColor: `${theme.palette.primary.main} !important`,
        color: `#FFFFFF !important`,
        '& svg': {
            color: `#FFFFFF !important`
        }
    }
}))

const CustomNavLink = forwardRef((props: any, ref: ForwardedRef<any>) => {
    const style = navLinkStyle()
    return <NavLink
        ref={ref}
        {...props}
        className={({ isActive }) => clsx(props.className, { [style.active]: isActive })}/>
})

export const DRAWER_WIDTH = 220

const NavBarStyle = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.paper
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: DRAWER_WIDTH,
            flexShrink: 0
        },
        transition: '.2s all'
    },
    drawerLogo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 220,
        height: 65,
        padding: theme.spacing(2)
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
        transition: '.3s all',
        boxShadow: '2px 50px 10px 0px rgba(0,0,0,0.3)',
        border: 'none !important',
        '&>div': {
            height: '100%'
        }
    },
    toolbar: theme.mixins.toolbar,
    listItemIcon: {
        minWidth: '30px'
    },
    list: {
        height: '100%',
        overflowY: 'auto',
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.1)',
            borderRadius: '5px'
        },
        '&::-webkit-scrollbar': {
            width: '5px',
            height: '5px'
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: '5px',
            backgroundColor: theme.palette.text.primary
        }
    },
    listItemButton: {
        marginTop: `${theme.spacing(0.5)} !important`,
        marginBottom: `${theme.spacing(0.5)} !important`,
        marginLeft: `${theme.spacing(1)} !important`,
        marginRight: `${theme.spacing(1)} !important`,
        borderRadius: `5px !important`
    }
})

/**
 * @private
 * @property {boolean} mobileOpen
 * @property {boolean} desktopOpen
 * @property {ThemeMode} themeMode
 * @property {function} drawerToggle
 * @property {function} closeMobileView
 */
interface Props extends WithStyles<typeof NavBarStyle, true> {
    readonly mobileOpen: boolean
    readonly desktopOpen: boolean
    readonly themeMode: ThemeMode

    drawerToggle(): void

    closeMobileView(): void
}

type IProps = Props & WithTranslation & IComponentRouter

/**
 * Component that renders the application drawer, responsible for the visibility of the system's navigation menu.
 * @component
 * @category Components
 * @subcategory layout
 * @property {boolean} mobileOpen Controls the visibility of the drawer when it's on mobile devices.
 * @property {boolean} desktopOpen Controls the visibility of the drawer when it's on desktops.
 * @property {ThemeMode} themeMode Theme Material UI
 * @property {function} drawerToggle Function that triggers the visibility of the drawer
 * @property {function} closeMobileView
 */
class NavBar extends Component<IProps> {

    /**
     * Render method.
     * Triggering method to render the component.
     * @public
     * @return {React.ReactNode} Component rendering
     */
    public render() {

        const {
            t,
            classes,
            desktopOpen,
            closeMobileView,
            themeMode,
            location: { pathname },
            navigate
        } = this.props

        const drawer = (
            <Box display="flex" flexDirection="column" className={classes.root}>
                <Box className={classes.toolbar}>
                    <Grid container={true} justifyContent="center">
                        <Tooltip title={`${t('DRAWER.HOME')}`} arrow={true}>
                            <Box className={classes.drawerLogo}>
                                <Link id="link_to_home_page" to="/" onClick={closeMobileView}>
                                    <img
                                        src={themeMode === ThemeMode.LIGHT ? LogoLight : LogoDark}
                                        alt="Logo"/>
                                </Link>
                            </Box>
                        </Tooltip>
                    </Grid>
                </Box>
                <List id="list_nav_bar_menu" className={classes.list}>

                    <ListItemButton
                        id="list_item_home"
                        component={CustomNavLink}
                        to="/app/home"
                        onClick={closeMobileView}
                        className={classes.listItemButton}>
                        <ListItemIcon className={classes.listItemIcon}><Home/></ListItemIcon>
                        <ListItemText primary={t('DRAWER.HOME')}/>
                    </ListItemButton>

                    <ListItemButton
                        id="list_item_home"
                        component={CustomNavLink}
                        to="/app/menu1"
                        onClick={closeMobileView}
                        className={classes.listItemButton}>
                        <ListItemIcon className={classes.listItemIcon}><Menu/></ListItemIcon>
                        <ListItemText primary={t('DRAWER.MENU1')}/>
                    </ListItemButton>

                    <ListItemButton
                        id="list_item_home"
                        component={CustomNavLink}
                        to="/app/menu2"
                        onClick={closeMobileView}
                        className={classes.listItemButton}>
                        <ListItemIcon className={classes.listItemIcon}><Dashboard/></ListItemIcon>
                        <ListItemText primary={t('DRAWER.MENU2')}/>
                    </ListItemButton>

                </List>
            </Box>
        )
        const pathNames: string[] = pathname.split('/')
        const value: string = pathNames[pathNames.length - 1]

        return <React.Fragment>

            <Box
                sx={{ display: { xl: 'none', lg: 'none', md: 'none', sm: 'flex', xs: 'flex' } }}
                position="fixed"
                bottom={0}
                width="100%">
                <BottomNavigation
                    sx={{ width: '95%', height: '40px' }}
                    value={value}
                    onChange={(e: any, newValue: string) => navigate(`/app/${newValue}`)}>
                    <BottomNavigationAction value="home" icon={<Home/>}/>
                    <BottomNavigationAction value="menu1" icon={<Menu/>}/>
                    <BottomNavigationAction value="menu2" icon={<Dashboard/>}/>
                </BottomNavigation>
            </Box>

            <Box sx={{ display: { xl: 'flex', lg: 'flex', md: 'flex', sm: 'none', xs: 'none' } }}>
                <nav className={desktopOpen ? classes.drawer : ''}>

                    <Drawer
                        id="drawer_desktop"
                        open={desktopOpen}
                        variant="persistent"
                        classes={{ paper: classes.drawerPaper }}>
                        {drawer}
                    </Drawer>
                </nav>
            </Box>


        </React.Fragment>

    }
}

const NavBarWithTranslation = withTranslation()(NavBar)

const NavBarWithStyle = withStyles<any>(NavBarStyle, { withTheme: true })(NavBarWithTranslation)

export default withRouter(NavBarWithStyle)
