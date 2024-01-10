import React, { Component } from 'react'

import { Box, CircularProgress, Theme, Typography } from '@mui/material'
import { createStyles, withStyles, WithStyles } from '@mui/styles'

const Style = (theme: Theme) => createStyles({
    external: {
        position: 'fixed',
        zIndex: 2000,
        background: 'rgba(0, 0, 0, 0.4)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0
    },
    internal: {
        position: 'absolute',
        background: theme.palette.background.paper,
        borderRadius: '5px',
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

/**
 * @private
 * @property {string} [id]
 * @property {string} [message]
 */
interface Props extends WithStyles<typeof Style> {
    readonly id?: string
    readonly message?: string
}

/**
 * Component that renders a load while data is being loaded.
 * @component
 * @category Components
 * @subcategory layout
 * @property {string} [id] Circular progress id
 * @property {string} [message] Wait message
 */
class LoadingComponent extends Component<Props> {

    /**
     * @public
     * @returns {React.ReactNode} Render loading component
     */
    public render() {
        const { id, message, classes } = this.props
        return (
            <Box className={classes.external}>

                <Box className={classes.internal} id={id}>

                    <CircularProgress id={`${id ? id + '_' : ''}circular_progress`}/>

                    {
                        message
                        && <Typography align="center" id={`${id ? id + '_' : ''}message`}>
                            {message}
                        </Typography>
                    }

                </Box>

            </Box>
        )
    }
}

const Loading: any = withStyles<any>(Style)(LoadingComponent)

export default Loading
