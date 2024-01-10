import React, { Component, lazy } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'

import { Box, Typography } from '@mui/material'
import { withStyles, WithStyles } from '@mui/styles'

import settingsLogo from '../../../assets/imgs/escape.pages/settings.svg'
import { Style } from './not.found'

const EscapePage = lazy(() => import('./escape.component'))

type Props = WithTranslation & WithStyles<typeof Style>

/**
 * Page that renders internal server error escape page.
 * @alias InternalError
 * @component
 * @category Components
 * @subcategory Escape Pages
 */
class InternalErrorComponent extends Component<Props> {

    /**
     * @public
     * @returns {React.ReactNode} Render the escape page.
     */
    public render() {
        const { t, classes } = this.props

        const image = <Box display="flex" justifyContent="center" alignItems="center" className={classes.image}>
            <img
                id="img_settings_logo"
                src={settingsLogo}
                title={t('ESCAPE_PAGE.INTERNAL_ERROR.TITLE')}
                alt={t('ESCAPE_PAGE.INTERNAL_ERROR.TITLE')}/>
            <Box p={1}>
                <Typography color="primary">ops...</Typography>
            </Box>
        </Box>


        return <EscapePage
            image={image}
            title={t('ESCAPE_PAGE.INTERNAL_ERROR.TITLE')}
            helmet={t('ESCAPE_PAGE.INTERNAL_ERROR.HELMET')}
            description={t('ESCAPE_PAGE.INTERNAL_ERROR.DESCRIPTION')}/>
    }
}

const InternalWithTranslation = withTranslation()(InternalErrorComponent)

const InternalError: any = withStyles<any>(Style, { withTheme: true })(InternalWithTranslation)

export default InternalError
