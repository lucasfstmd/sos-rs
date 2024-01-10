import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { withTranslation, WithTranslation } from 'react-i18next'

import { Box, Breadcrumbs, Theme, Typography } from '@mui/material'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import { IComponentRouter, withRouter } from '../../with.router'

export const BreadCrumbStyle = (theme: Theme) => createStyles({
    breadcrumbs: {
        padding: '35px 0px 10px 0px'
    },
    link: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: theme.palette.primary.main,
        fontSize: 12
    }
})

/**
 * @private
 * @property {string} breadCrumbLast
 */
interface IProps extends WithStyles<typeof BreadCrumbStyle> {
    readonly breadCrumbLast: string
}

type IJoinProps = IProps & WithTranslation & IComponentRouter

/**
 * Component that renders the structural navigation of the system
 * @component
 * @category Components
 * @subcategory layout
 * @property {string} breadCrumbLast Structural navigation
 */
class BreadCrumb extends Component<IJoinProps> {

    private static getBreadCrumbName(listId: string[] | undefined): any {
        return {
            '/app': 'DRAWER.HOME',
            '/app/menu1': 'DRAWER.MENU1',
            '/app/menu2': 'DRAWER.MENU2'
        }
    }

    constructor(props: IJoinProps) {
        super(props)
        BreadCrumb.getBreadCrumbName = BreadCrumb.getBreadCrumbName.bind(this)
    }

    /**
     * @public
     * @returns {React.ReactNode} Rendering of structural navigation
     */
    public render() {
        const {
            location,
            breadCrumbLast,
            classes,
            t
        } = this.props

        const pathnames = location
            ?.pathname
            ?.split('/')
            ?.filter((x) => x)

        const resourceId: string[] = pathnames.filter(path => path.match(/[a-fA-F0-9]{24}/g))

        const content: React.ReactNode = (
            pathnames
                .filter((value: string) => value !== 'home')
                .map((value: string, index: number) => {
                    const last = index === pathnames.length - 1
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`
                    return last
                        ? <Typography color="textPrimary" key={to} noWrap={true} style={{ fontSize: 12 }}>
                            {t(BreadCrumb.getBreadCrumbName(resourceId)[to]) || breadCrumbLast}
                        </Typography>
                        : <RouterLink
                            color="inherit"
                            to={to}
                            key={to}
                            className={classes.link}>
                            {t(BreadCrumb.getBreadCrumbName(resourceId)[to]) || breadCrumbLast}
                        </RouterLink>
                })
        )

        return <React.Fragment>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Box mt={1}>
                    <Breadcrumbs
                        id="breadcrumb"
                        maxItems={4}
                        aria-label="breadcrumb"
                        className={classes.breadcrumbs}>
                        {
                            content
                        }
                    </Breadcrumbs>
                </Box>
            </Box>

            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <Box mt={2}>
                    <Breadcrumbs
                        id="breadcrumb"
                        maxItems={3}
                        itemsAfterCollapse={2}
                        itemsBeforeCollapse={0}
                        aria-label="breadcrumb"
                        className={classes.breadcrumbs}>
                        {
                            content
                        }
                    </Breadcrumbs>
                </Box>
            </Box>

        </React.Fragment>
    }
}

const BreadCrumbWithTranslation = withTranslation()(BreadCrumb)

const BreadCrumbWithStyleComponent = withStyles<any>(BreadCrumbStyle)(BreadCrumbWithTranslation)

export default withRouter(BreadCrumbWithStyleComponent)
