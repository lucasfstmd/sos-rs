import React, { Component } from 'react'

import { WithTranslation, withTranslation } from 'react-i18next'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import { connect } from 'react-redux'
import { Alert as MuiAlert, AlertProps, Box, Snackbar, Theme, Typography } from '@mui/material'

// import { closeSnackBar } from '../../../store/snackbar'
import { ApplicationState } from '../../../store/root.types'

const Style = (theme: Theme) => createStyles({
    root: {
        marginTop: theme.spacing(3)
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        maxWidth: '250px'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '12px'
    },
    message: {
        fontSize: '12px'
    }
})

export const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export enum SnackBarMessageType {
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning',
    SUCCESS = 'success'
}

/**
 * @private
 * @property {boolean} open
 * @property {string} title
 * @property {string} message
 * @property {SnackBarMessageType} type
 * @property {function} close
 */
interface IProps extends WithStyles<typeof Style> {
    readonly open: boolean
    readonly title: string
    readonly message: string
    readonly type: SnackBarMessageType

    closeSnackBar(): void
}

type Props = IProps & WithTranslation

/**
 * Component that renders a snackbar containing a title and a system alert message.
 * @component
 * @category Components
 * @subcategory layout
 * @property {boolean} open property that controls the visibility of the snackbar
 * @property {string} title Title that will appear in the snackbar
 * @property {string} message Message that will appear in snackbar
 * @property {SnackBarMessageType} type property that defines the type of snackbar
 * @property {function} close function that triggers the closing of the snackbar
 */
class SnackbarComponent extends Component<Props> {

    /**
     * @public
     * @returns {React.ReactNode} Custom alert for system messages
     */
    public render() {
        const {
            closeSnackBar,
            open,
            message,
            title,
            type,
            classes,
            t
        } = this.props

        let horizontal: any = 'right'
        let vertical: any = 'top'

        if (window?.innerWidth <= 360) {
            horizontal = 'center'
            vertical = 'bottom'
        }

        return <Snackbar
            id="snackbar-component"
            open={open}
            autoHideDuration={5000}
            onClose={closeSnackBar}
            className={classes.root}
            anchorOrigin={{ vertical, horizontal }}>
            <Alert id="alert-system" onClose={closeSnackBar} severity={type}>
                <Box className={classes.container}>
                    {
                        !!title && <Typography id="alert-title" className={classes.title}>{t(title)}</Typography>
                    }
                    {
                        !!message &&
                        <Typography id="alert-message" className={classes.message}>{t(message)}</Typography>
                    }
                </Box>
            </Alert>
        </Snackbar>
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    open: state.snackbar.open,
    title: state.snackbar.title,
    message: state.snackbar.message,
    type: state.snackbar.type
})

const SnackBarWithTranslations: any = withTranslation()(SnackbarComponent)

const SnackBarWithStyle: any = withStyles<any>(Style)(SnackBarWithTranslations)

export default connect(mapStateToProps, { closeSnackBar: () => console.log('CloseSnackBar') })(SnackBarWithStyle)


