import React, { Component, lazy } from 'react'
import { connect } from 'react-redux'
import { withTranslation, WithTranslation } from 'react-i18next'
import clsx from 'clsx'
import { Box, Button, Theme } from '@mui/material'
import { createStyles, withStyles, WithStyles } from '@mui/styles'

import { ThemeMode } from '../../../material.theme'
import { IComponentRouter, withRouter } from '../../with.router'
import { ApplicationState } from '../../../store/root.types'

const Style = (theme: Theme) => createStyles({
    boxImage: {
        textAlign: 'center',
        '& img': {
            width: '80px',
            color: theme.palette.primary.main
        }
    },
    title: {
        fontSize: '30px',
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    description: {
        fontSize: '24px'
    },
    common: {
        color: theme.palette.primary.main,
        textAlign: 'center'
    },
    footerColor: {
        color: '#FFFFFF'
    }
})

const EscapeWrapper = lazy(() => import('./wrapper'))


/**
 * @private
 * @property {string} title'
 * @property {string} description
 * @property {React.ReactNode} Image
 * @property {ThemeMode} themeMode
 */
interface Props extends IComponentRouter {
    readonly helmet: string
    readonly title: string
    readonly description: string
    readonly image: React.ReactNode
    readonly themeMode: ThemeMode
}

type JoinProps = Props & WithTranslation & WithStyles<typeof Style>

/**
 * Parent component of escape pages.
 * @component
 * @category Components
 * @subcategory Escape Pages
 * @property {string} title Title of escape page
 * @property {string} description Description of what the page refers to.
 * @property {React.ReactNode} image Image and or icon with representation of what refers to the escape page.
 * @property {ThemeMode} themeMode Material UI Theme
 */
class Escape extends Component<JoinProps, {}> {

    /**
     * @public
     * @returns {React.ReactNode} Renders the escape page.
     */
    public render() {

        const {
            classes,
            t,
            title,
            description,
            image,
            navigate,
            helmet
        } = this.props

        return <EscapeWrapper title={helmet}>

            <Box display="flex" flexDirection="column" justifyContent="space-between">
                <Box className={classes.boxImage} p={0}>
                    {image}
                </Box>

                <Box className={clsx(classes.title, classes.common)} p={1}>
                    {title}
                </Box>

                <Box className={clsx(classes.description, classes.common)} p={1}>
                    {description}
                </Box>

                <Box className={classes.common} p={1}>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => navigate('/')}>
                        {t('BUTTON.HOME_PAGE')}
                    </Button>
                </Box>
            </Box>

        </EscapeWrapper>
    }
}

const EscapeWithTranslation = withTranslation()(Escape)

const EscapeWithStyle = withStyles<any>(Style, { withTheme: true })(EscapeWithTranslation)

const EscapeWithRouter = withRouter(EscapeWithStyle)

const mapStateToProps = (state: ApplicationState) => ({ themeMode: state.layout.themeMode })

export default connect(mapStateToProps, undefined)(EscapeWithRouter)
