import React, { Component } from 'react'

import { WithTranslation, withTranslation } from 'react-i18next'
import { DarkMode, LightMode } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { connect } from 'react-redux'
import { LayoutActions, IActionsChangeThemeMode } from '../../store/layout'
import { parseStringToThemeMode, ThemeMode } from '../../material.theme'
import localStorageService from '../../services/local.storage'
import { ApplicationState } from '../../store/root.types'

interface IProps {
    readonly themeMode: ThemeMode
    readonly color?: string

    changeTheme(props: IActionsChangeThemeMode): void
}

type IJoin = IProps & WithTranslation

class ThemeButtonComponent extends Component<IJoin> {

    constructor(props: IJoin) {
        super(props)
        this.changeThemeMode = this.changeThemeMode.bind(this)
    }

    /**
     * Method belonging to the component's life cycle, triggered immediately after a component is assembled (inserted in the tree).
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidmount}
     * @return {void}
     */
    public componentDidMount() {
        const { changeTheme, themeMode } = this.props
        const themeModeLocal: string = localStorageService.getItem('themeMode')
        if (themeModeLocal && themeModeLocal !== themeMode) {
            changeTheme({ themeMode: parseStringToThemeMode(themeModeLocal) })
        }
    }

    public render() {
        const { t, themeMode, color } = this.props
        return <React.Fragment>
            <Tooltip title={`${t('THEME_BUTTON.CHANGE_THEME')}`}>
                <IconButton
                    id="btn_change_theme"
                    onClick={this.changeThemeMode}
                    style={{ color }}>
                    {themeMode === ThemeMode.LIGHT ? <DarkMode/> : <LightMode/>}
                </IconButton>
            </Tooltip>
        </React.Fragment>
    }

    private changeThemeMode(): void {
        const { changeTheme, themeMode } = this.props
        themeMode === ThemeMode.LIGHT ?
            changeTheme({ themeMode: ThemeMode.DARK })
            : changeTheme({ themeMode: ThemeMode.LIGHT })
    }
}

const mapStateToProps = (state: ApplicationState) => ({ themeMode: state.layout.themeMode })

const ThemeButtonWithTranslation = withTranslation()(ThemeButtonComponent)

const ThemeButton = connect(mapStateToProps, LayoutActions)(ThemeButtonWithTranslation)

export default ThemeButton
