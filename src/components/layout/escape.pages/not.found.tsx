import React, { Component, lazy } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'

import { Box, Typography } from '@mui/material'
import { createStyles, withStyles, WithStyles } from '@mui/styles'

import warningLogo from '../../../assets/imgs/escape.pages/not-found.svg'

const EscapePage = lazy(() => import('./escape.component'))

export const Style = () => createStyles({
    image: {
        padding: 0,
        '& p': {
            fontSize: '40px',
            fontWeight: 'bold',
            marginTop: '-10px'
        }
    }
})

type Props = WithTranslation & WithStyles<typeof Style>

/**
 * Page that renders not found escape page.
 * @alias NotFound
 * @component
 * @category Components
 * @subcategory Escape Pages
 */
class NotFoundComponent extends Component<Props> {

    /**
     * @public
     * @returns {React.ReactNode} Render the escape page.
     */
    public render() {
        const { t, classes } = this.props

        const image = <Box display="flex" justifyContent="center" alignItems="center" className={classes.image}>
            <img
                id="img_warning"
                src={warningLogo}
                title={t('ESCAPE_PAGE.NOT_FOUND.TITLE')}
                alt={t('ESCAPE_PAGE.NOT_FOUND.TITLE')}/>
            <Box p={1}>
                <Typography color="primary">404</Typography>
            </Box>
        </Box>

        return <EscapePage
            image={image}
            helmet={t('ESCAPE_PAGE.NOT_FOUND.HELMET')}
            title={t('ESCAPE_PAGE.NOT_FOUND.TITLE')}
            description={t('ESCAPE_PAGE.NOT_FOUND.DESCRIPTION')}/>
    }
}

const NotFoundWithTranslation = withTranslation()(NotFoundComponent)

const NotFound: any = withStyles<any>(Style, { withTheme: true })(NotFoundWithTranslation)

export default NotFound
