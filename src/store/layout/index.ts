import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { LanguageOptions } from '../../i18n'
import { ThemeMode } from '../../material.theme'
import localStorageService from '../../services/local.storage'

export interface LayoutState {
    readonly username: string
    readonly language: LanguageOptions
    readonly breadCrumbLast: string
    readonly themeMode: ThemeMode
    readonly updateAvailable: boolean
    readonly registration: ServiceWorkerRegistration | undefined
}

export interface IActionsChangeLanguage {
    readonly language: LanguageOptions
}

export interface IActionsChangeBreadCrumbLast {
    readonly breadCrumbLast: string | undefined
}

export interface IActionsChangeUserName {
    readonly username: string
}

export interface IActionsChangeThemeMode {
    readonly themeMode: ThemeMode
}

export interface IActionsChangeUpdateAvailable {
    readonly updateAvailable: boolean,
    readonly registration: ServiceWorkerRegistration | undefined
}

const initialState: LayoutState = {
    username: '',
    language: LanguageOptions.PT_BR,
    breadCrumbLast: '',
    themeMode: ThemeMode.LIGHT,
    updateAvailable: false,
    registration: undefined
}

export const layoutSlice = createSlice({
    name: '@layout',
    initialState,
    reducers: {
        changeLanguage: (state: Draft<LayoutState>, action: PayloadAction<IActionsChangeLanguage>) => {
            const { language } = action.payload
            localStorageService.setItem('language', language)
            state.language = language
        },
        changeBreadCrumbLast: (state: Draft<LayoutState>, action: PayloadAction<IActionsChangeBreadCrumbLast>) => {
            const { breadCrumbLast } = action.payload
            state.breadCrumbLast = `${breadCrumbLast || ''}`
        },
        changeUserName: (state: Draft<LayoutState>, action: PayloadAction<IActionsChangeUserName>) => {
            const { username } = action.payload
            localStorageService.setItem('username', username)
            state.username = username
        },
        changeTheme: (state: Draft<LayoutState>, action: PayloadAction<IActionsChangeThemeMode>) => {
            const { themeMode } = action.payload
            localStorageService.setItem('themeMode', themeMode)
            state.themeMode = themeMode
        },
        changeUpdateAvailable: (state: Draft<LayoutState>, action: PayloadAction<IActionsChangeUpdateAvailable>) => {
            const { updateAvailable, registration } = action.payload
            state.updateAvailable = updateAvailable
            state.registration = registration
        }
    }
})

/**
 * <h5>Actions used to manipulate the application's layout.</h5>
 * @see {@link https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-actions}
 * @typedef LayoutActions
 * @namespace LayoutActions
 * @category React
 * @subcategory Redux / Actions
 *
 * @property {Function} changeLanguage
 * @property {Function} changeBreadCrumbLast
 * @property {Function} changeUserName
 * @property {Function} changeTheme
 * @property {Function} changeUpdateAvailable
 */
export const LayoutActions = layoutSlice.actions

export default layoutSlice.reducer
