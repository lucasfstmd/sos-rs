import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { withTranslation, WithTranslation } from 'react-i18next'
import { RouterProvider } from 'react-router-dom'
import CONFIG_THEME, { ThemeMode } from './material.theme'
import {
    LanguageOptions,
    MAP_ENUM_TO_LANGUAGE,
    MAP_ENUM_TO_LOCALE,
    parseStringToEnumLanguage
} from './i18n'
import { LayoutActions } from './store/layout'
import SnackbarComponent from './components/layout/snackbar'
import router from './routes'
import ErrorBoundary from './components/layout/error.boundary'
import localStorageService from './services/local.storage'
import UpdateAvailable from './components/layout/update.available'
import { ApplicationState } from './store/root.types'
import Loading from './components/layout/loading'

interface Props {
    readonly language: LanguageOptions
    readonly themeMode: ThemeMode

    changeLanguage(language: LanguageOptions): void

    changeTheme(themeMode: ThemeMode): void
}

type IJoinProps = Props & WithTranslation

/**
 * Component that organizes the system theme.
 * @category Source
 * @subcategory Render
 * @property {LanguageOptions} language System language
 * @property {ThemeMode} themeMode Material UI theme
 * @property {Function} changeLanguage Material UI theme
 * @property {Function} changeLanguage Material UI theme
 */
class ThemeProviderComponent extends Component<IJoinProps> {

    constructor(props: IJoinProps) {
        super(props)
        this.setLanguage = this.setLanguage.bind(this)
    }

    /**
     * Method belonging to the component's life cycle, triggered immediately after a component is assembled (inserted in the tree).
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidmount}
     * @return {void}
     */
    public componentDidMount() {
        const language: string = `${localStorageService.getItem('language')}`
        const localLanguage: LanguageOptions = parseStringToEnumLanguage(language)
        if (localLanguage) {
            this.setLanguage(localLanguage)
        }
    }

    /**
     * Is invoked immediately after any update occurs. This method is not called by the initial render.
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidupdate}
     * @public
     * @param {Readonly<IJoinProps>} prevProps
     * @param {Readonly<{}>} prevState
     * @param {*} [snapshot]
     * @returns {void}
     */
    public componentDidUpdate(prevProps: Readonly<IJoinProps>, prevState: Readonly<{}>, snapshot?: any): void {
        const { language } = this.props
        if (language !== prevProps.language) {
            this.setLanguage(language)
        }
    }

    public render() {

        const {
            language,
            themeMode
        } = this.props
        return <ThemeProvider theme={createTheme(CONFIG_THEME[themeMode], MAP_ENUM_TO_LOCALE[language])}>
            <ErrorBoundary>
                <React.Fragment>
                    <CssBaseline/>
                    <SnackbarComponent/>
                    <UpdateAvailable/>
                    <Suspense fallback={<Loading/>}>
                        <RouterProvider router={router}/>
                    </Suspense>
                </React.Fragment>
            </ErrorBoundary>
        </ThemeProvider>
    }

    private setLanguage(language: LanguageOptions): void {
        this.props.i18n.changeLanguage(MAP_ENUM_TO_LANGUAGE[language]).then()
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    language: state.layout.language,
    themeMode: state.layout.themeMode
})

const ThemeWithTranslation: any = withTranslation()(ThemeProviderComponent)

export default connect(mapStateToProps, LayoutActions)(ThemeWithTranslation)
