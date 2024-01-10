import React, { Component, lazy } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'

import { WithStyles } from '@mui/styles'

import protectionLogo from '../../../assets/imgs/escape.pages/protection.svg'

const EscapePage = lazy(() => import('./escape.component'))

type Props = WithTranslation & WithStyles<any>

/**
 * Page that renders access denied escape page.
 * @alias AccessDenied
 * @component
 * @category Components
 * @subcategory Escape Pages
 */
class AccessDeniedComponent extends Component<Props> {

    /**
     * @public
     * @returns {React.ReactNode} Render the escape page.
     */
    public render() {
        const { t } = this.props

        const image = <img
            src={protectionLogo}
            title={t('ESCAPE_PAGE.ACCESS_DENIED.TITLE')}
            alt={t('ESCAPE_PAGE.ACCESS_DENIED.TITLE')}/>

        return <EscapePage
            image={image}
            title={t('ESCAPE_PAGE.ACCESS_DENIED.TITLE')}
            helmet={t('ESCAPE_PAGE.ACCESS_DENIED.HELMET')}
            description={t('ESCAPE_PAGE.ACCESS_DENIED.DESCRIPTION')}/>
    }
}

const AccessDenied: any = withTranslation()(AccessDeniedComponent)

export default AccessDenied
