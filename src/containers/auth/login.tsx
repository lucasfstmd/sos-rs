import React, { ChangeEvent, Component, lazy } from 'react'

import { WithTranslation, withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Theme
} from '@mui/material'
import { createStyles, WithStyles, withStyles } from '@mui/styles'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { LoginValidator } from '../../application/domain/validators/auth/login'
import { LanguageOptions } from '../../i18n'
import { ThemeMode } from '../../material.theme'
import { IComponentRouter, withRouter } from '../../components/with.router'
import { ApplicationState, AsyncStateStatus } from '../../store/root.types'
import { AuthActions } from '../../store/auth'
import { LayoutActions, IActionsChangeLanguage } from '../../store/layout'

import ThemeButton from '../layout/theme.button'
import { IActionAuth } from '../../store/auth/types'
import Footer from '../../components/layout/footer'
import authService from '../../services/auth'
import Redirect from '../../components/redirect'

const FormErrorMessage = lazy(() => import('../../components/form.error'))

const Style = (theme: Theme) => createStyles({
    formControl: {
        width: '100%'
    },
    error: {
        color: theme.palette.error.main
    },
    buttonProgress: {
        color: theme.palette.primary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    }
})

/**
 * @private
 * @property {boolean} loading
 * @property {boolean} error
 * @property {LanguageOptions} language
 * @property {ThemeMode} themeMode
 * @property {AuthActions} loginRequest
 * @property {any} data
 */
interface Props extends IComponentRouter {
    readonly status: AsyncStateStatus
    readonly language: LanguageOptions
    readonly themeMode: ThemeMode
    readonly data: any

    loginRequest(props: IActionAuth): void

    loginReset(): void

    changeLanguage(props: IActionsChangeLanguage): void
}

/**
 * @private
 * @property {boolean} showPassword Controls password visibility
 * @property {string} login Field to enter the access login
 * @property {string} password Field to enter the access password
 */
interface State {
    readonly showPassword: boolean
    readonly login: string
    readonly password: string
}

type JoinProps = Props & WithTranslation & WithStyles<typeof Style, true>

/**
 * Component that renders the system authentication page.
 * @component
 * @category Containers
 * @subcategory Authentication
 * @property {boolean} loading Assistance in data loading
 * @property {boolean} error If true, there was an error when logging in
 * @property {LanguageOptions} language Variable controls the system language
 * @property {ThemeMode} themeMode Material UI theme mode
 * @property {AuthActions} loginRequest Action that triggers the request to login
 * @property {LayoutActions} changeLanguage Action that triggers system language change
 * @see {@link LoginActions} Files containing authentication actions
 * @see {@link LayoutActions} Files containing layout actions
 */
class Login extends Component<JoinProps, State> {

    constructor(props: JoinProps) {
        super(props)

        /* Initial State */
        this.state = {
            showPassword: false,
            login: '',
            password: ''
        }

        /* Bind Context */
        this.changePasswordVisibility = this.changePasswordVisibility.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    /**
     * Method belonging to the component's life cycle, triggered immediately after a component is assembled (inserted in the tree).
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidmount}
     * @return {void}
     */
    public componentDidMount() {
        const { t } = this.props
        document.title = `${t('AUTH.LOGIN.HELMET')}`
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
    public componentDidUpdate(prevProps: Readonly<JoinProps>, prevState: Readonly<State>, snapshot?: any): void {
        const { status } = this.props
        const { status: prevStatus } = prevProps
        const error: boolean = status === AsyncStateStatus.FAILURE
        if (error && (status !== prevStatus)) {
            this.setState({ password: '' })
        }
    }

    /**
     * Invoked immediately before a component is disassembled and destroyed.
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentwillunmount}
     * @public
     * @returns {void}
     */
    public componentWillUnmount(): void {
        this.props.loginReset()
    }

    /**
     * @public
     * @returns {React.ReactNode} Login screen for the user to authenticate to the system
     */
    public render() {
        const {
            t,
            classes,
            status,
            theme
        } = this.props
        const { showPassword, login, password } = this.state
        const loading: boolean = status === AsyncStateStatus.LOADING

        console.log({
            REACT_APP_LS_SECRET_KEY: process.env.REACT_APP_LS_SECRET_KEY,
            REACT_APP_TITLE: process.env.REACT_APP_TITLE,
            REACT_APP_DESCRIPTION: process.env.REACT_APP_DESCRIPTION,
            REACT_APP_ISSUER: process.env.REACT_APP_ISSUER,
            REACT_APP_JWT_PUBLIC_KEY: process.env.REACT_APP_JWT_PUBLIC_KEY
        })

        if (authService.isAuthenticated()) {
            return <Redirect to="/app/home"/>
        }

        return <React.Fragment>

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                height="100%">

                <Box
                    top={0}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    p={1}
                    width={'100%'}
                    zIndex={1200}>
                    <ThemeButton color={theme.palette.primary.main}/>
                </Box>

                <Box pt={1} pl={3} pr={3} maxWidth={350}>

                    <Formik
                        initialValues={{ login, password }}
                        onSubmit={this.handleSubmit}
                        validationSchema={LoginValidator.validationScheme}
                        validateOnMount={true}
                        enableReinitialize={true}>
                        {({

                              values,
                              isValid,
                              errors,
                              touched,
                              setFieldValue,
                              setFieldTouched
                          }) => (
                            <Form id="form_login">
                                <Field id="username" name="username" type="customField">
                                    {() => (
                                        <Box display="flex" justifyContent="center">
                                            <FormControl
                                                className={classes.formControl}
                                                error={!!errors.login && !!touched.login}>
                                                <InputLabel htmlFor="inp_username">
                                                    {t('AUTH.LOGIN.LOGIN')}
                                                </InputLabel>
                                                <Input
                                                    id="inp_username"
                                                    name="username"
                                                    type="text"
                                                    fullWidth={true}
                                                    autoFocus={true}
                                                    value={values?.login || ''}
                                                    onChange={
                                                        (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                                            setFieldValue('login', e.target.value)
                                                        }
                                                    }
                                                    onBlur={() => setFieldTouched('login', true, true)}
                                                />
                                                <FormErrorMessage name="login"/>
                                            </FormControl>
                                        </Box>
                                    )}
                                </Field>

                                <Field id="password" name="password" type="customField">
                                    {() => (
                                        <Box display="flex" justifyContent="center">
                                            <FormControl
                                                className={classes.formControl}
                                                error={!!errors.password && !!touched.password}>
                                                <InputLabel htmlFor="inp_password">
                                                    {t('AUTH.LOGIN.PASSWORD')}
                                                </InputLabel>
                                                <Input
                                                    id="inp_password"
                                                    name="password"
                                                    value={values?.password || ''}
                                                    type={showPassword ? 'text' : 'password'}
                                                    fullWidth={true}
                                                    className={
                                                        !!errors.password && !!touched.password ?
                                                            classes.error
                                                            : ''
                                                    }
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                color="inherit"
                                                                aria-label="toggle password visibility"
                                                                onClick={() => this.changePasswordVisibility(true)}
                                                                onMouseDown={() => this.changePasswordVisibility(false)}>
                                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    onChange={
                                                        (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                                            setFieldValue('password', e.target.value)
                                                        }
                                                    }
                                                    onBlur={() => setFieldTouched('password', true, true)}
                                                />
                                                <FormErrorMessage name="password"/>
                                            </FormControl>
                                        </Box>
                                    )}
                                </Field>

                                <Box display="flex" justifyContent="center">
                                    <FormControl className={classes.formControl}>
                                        <Button
                                            id="btn_enter"
                                            type="submit"
                                            variant="contained"
                                            size="medium"
                                            color="primary"
                                            disabled={!isValid || loading}>
                                            {t('AUTH.LOGIN.ENTER')}
                                        </Button>

                                        {
                                            loading &&
                                            <CircularProgress
                                                id="loading_enter"
                                                size={24}
                                                className={classes.buttonProgress}/>
                                        }

                                    </FormControl>
                                </Box>

                            </Form>
                        )}
                    </Formik>

                </Box>

                <Footer/>

            </Box>

        </React.Fragment>
    }

    private changePasswordVisibility(visibility: boolean): void {
        this.setState({ showPassword: visibility })
    }

    private handleSubmit(credentials: IActionAuth): void {
        const { login, password } = credentials
        this.setState({
            login,
            password
        })
        // this.props.loginRequest(credentials)
        this.props.navigate('/app/home')
    }
}

const loginWithTranslation = withTranslation()(Login)

const loginWithStyle: any = withStyles<any>(Style, { withTheme: true })(loginWithTranslation)

const mapStateToProps = (state: ApplicationState) => ({
    status: state.auth.login.status,
    language: state.layout.language,
    themeMode: state.layout.themeMode
})

const mapDispatchToProps = {
    ...AuthActions,
    ...LayoutActions
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(loginWithStyle))
