import { createSlice } from '@reduxjs/toolkit'
import { AsyncStateStatus } from '../root.types'
import { AuthState } from './types'

const initialState: AuthState = {
    login: {
        status: AsyncStateStatus.INITIAL
    }
}

export const authSlice = createSlice({
    name: '@auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        loginReset: (state: AuthState) => {
            state.login = initialState.login
        },
        loginRequest: (state: AuthState) => {
            state.login.status = AsyncStateStatus.LOADING
        },
        loginSuccess: (state: AuthState) => {
            state.login.status = AsyncStateStatus.SUCCESS
        },
        loginFailure: (state: AuthState) => {
            state.login.status = AsyncStateStatus.FAILURE
        }
    }
})

/**
 * <h5>Functions that trigger actions related to authentication in the system.</h5>
 * @see {@link https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-actions}
 * @typedef AuthActions
 * @namespace AuthActions
 * @category React
 * @subcategory Redux / Actions
 * @property {Function} loginReset
 * @property {Function} loginRequest
 * @property {Function} loginSuccess
 * @property {Function} loginFailure
 */
export const AuthActions = authSlice.actions

export default authSlice.reducer
