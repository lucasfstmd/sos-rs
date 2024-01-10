import { all, apply, call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { push } from '@lagunovsky/redux-react-router'

import { LayoutActions } from '../layout'
import { AuthActions } from './index'
import { User } from '../../application/domain/models/auth/user'
import { UserType } from '../../application/domain/utils/user.type'
import authService from '../../services/auth'
import usersService from '../../services/users'
import { AccessToken } from '../../application/domain/models/auth/access.token'
import { AuthTypes, IActionAuth } from './types'

/**
 * <h5>Generator functions that make calls to the authentication service to obtain the data.</h5>
 * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/function*}
 * @typedef AuthSagas
 * @namespace AuthSagas
 * @category React
 * @subcategory Redux / Sagas
 */

/**
 * Generating function that calls the login service to authenticate the system.
 * @memberof AuthSagas
 * @alias AuthSagas.authenticate
 * @function
 * @category React
 * @subcategory Redux / Sagas
 * @param {PayloadAction<IActionAuth>} action User triggered action data.
 */
export function* authenticate(action: PayloadAction<IActionAuth>) {
    const { loginSuccess, loginFailure } = AuthActions
    try {
        const { login, password } = action.payload
        const accessToken: AccessToken = yield apply(authService, authService.login, [login, password])
        const userType: UserType = UserType[`${accessToken.sub_type}`.toUpperCase() as keyof typeof UserType]
        yield call(getUserLogged, userType, `${accessToken.sub}`)
        yield put(loginSuccess())
        yield put(push(`/app/home`))
    } catch (err) {
        yield put(loginFailure())
    }
}

/**
 * Generator function that calls the service to load a user's data.
 * @memberof AuthSagas
 * @alias AuthSagas.getUserLogged
 * @function
 * @category React
 * @subcategory Redux / Sagas
 * @param {UserType} type Type of user.
 * @param {string} userId User identifier.
 */
export function* getUserLogged(type: UserType, userId: string) {
    const { changeUserName } = LayoutActions
    try {
        const user: User = yield apply(usersService, usersService.getById, [type, userId])
        yield put(changeUserName({ username: `${user?.name}` }))
    } catch (err) {
        yield put(changeUserName({ username: `` }))
    }
}

const authSaga = function* () {
    yield all([
        takeLatest(AuthTypes.LOGIN_REQUEST, authenticate)
    ])
}

export default authSaga
