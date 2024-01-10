import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'

import { Box, Theme, Typography } from '@mui/material'
import { createStyles, withStyles, WithStyles } from '@mui/styles'

import * as Package from '../../../../package.json'

const version: string = `${Package?.version || ''}`

const Style = (theme: Theme) => createStyles({
    footer: {
        textAlign: 'center',
        flexShrink: 0,
        padding: theme.spacing(1)
    }
})

/**
 * @private
 * @property {string} [className]
 */
interface Props {
    className?: string
}

type IProps = Props & WithStyles<typeof Style> & WithTranslation

/**
 * Component that renders the application footer.
 * @alias Footer
 * @component
 * @category Components
 * @subcategory layout
 * @property {string} [className] Style Classes
 */
class FooterComponent extends Component<IProps> {
    /**
     * @public
     * @returns {React.ReactNode} Render the footer
     */
    public render() {
        const { classes, className, t } = this.props
        const year = new Date().getFullYear()
        const appTitle: string = `${process.env.REACT_APP_TITLE || t('APP.TITLE')}`
        return <footer className={classes.footer}>
            <Box className={className}>
                <Typography variant="caption">
                    © {year} | {appTitle} {version ? `| v${version}` : ''}
                </Typography>
            </Box>
        </footer>
    }
}

const FooterWithTranslation = withTranslation()(FooterComponent)

const Footer: any = withStyles<any>(Style)(FooterWithTranslation)

export default Footer
