import { AsyncStateStatus } from '../root.types'

/**
 * <h5> </h5>
 * @typedef AuthTypes
 * @namespace AuthTypes
 * @category React
 * @subcategory Redux / Types
 */

/**
 * Typing constant of action identifiers.
 * </br>
 * The action identifiers are:
 * <pre>
 *     <ul>
 *         <li>@auth/loginReset</li>
 *         <li>@auth/loginRequest</li>
 *         <li>@auth/loginSuccess</li>
 *         <li>@auth/loginFailure</li>
 *      </ul>
 * </pre>
 * @memberof AuthTypes
 * @function
 * @category React
 * @subcategory Redux / Types
 */
export enum AuthTypes {
    LOGIN_RESET = '@auth/loginReset',
    LOGIN_REQUEST = '@auth/loginRequest',
    LOGIN_SUCCESS = '@auth/loginSuccess',
    LOGIN_FAILURE = '@auth/loginFailure',
}


/**
 * @memberof AuthTypes
 * @interface
 * @category React
 * @subcategory Redux / Types
 * @property {string} login Auth data login.
 * @property {string} password Auth data password.
 */
export interface IActionAuth {
    readonly login: string
    readonly password: string
}


/**
 * @memberof AuthTypes
 * @interface
 * @category React
 * @subcategory Redux / Types
 * @property {AsyncStateStatus} status
 */
interface ILoginState {
    status: AsyncStateStatus
}


/**
 * @memberof AuthTypes
 * @interface
 * @category React
 * @subcategory Redux / Types
 * @property {ILoginState} login
 */
export interface AuthState {
    login: ILoginState
}


