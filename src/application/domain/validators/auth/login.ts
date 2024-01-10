import * as Yup from 'yup'

/**
 * @class
 * @category Validators
 */
export class LoginValidator {

    /**
     * Username parameter validation
     * @static
     * @private
     */
    private static _login: Yup.StringSchema<string> = Yup.string()
        .min(2, 'AUTH.LOGIN.VALIDATORS.INVALID_LOGIN')
        .required('AUTH.LOGIN.VALIDATORS.LOGIN')

    /**
     * Password parameter validation
     * @static
     * @private
     */
    private static _password: Yup.StringSchema<string> = Yup.string()
        .required('AUTH.LOGIN.VALIDATORS.PASSWORD')

    /**
     * Object with parameters to be validated
     * @static
     * @example
     * {
     *      login: this.login,
     *      password: this.password
     * }
     * @returns {Yup.ObjectSchema<object>}
     */
    static get validationScheme(): Yup.ObjectSchema<object> {
        return Yup
            .object()
            .shape({
                login: this.login,
                password: this.password
            })
    }

    /**
     * Get from the username parameter
     * @static
     * @returns {Yup.StringSchema<string>}
     */
    static get login(): Yup.StringSchema<string> {
        return this._login
    }

    /**
     * Get parameter password
     * @static
     * @returns {Yup.StringSchema<string>}
     */
    static get password(): Yup.StringSchema<string> {
        return this._password
    }
}
