import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { SnackBarMessageType } from '../../components/layout/snackbar'

export interface LayoutState {
    readonly open: boolean
    readonly message: string
    readonly title: string
    readonly type: SnackBarMessageType
}

export interface IActionsOpenSnackBar {
    readonly type: SnackBarMessageType
    readonly title: string
    readonly message: string
}

const initialState: LayoutState = {
    open: false,
    title: '',
    message: '',
    type: SnackBarMessageType.INFO
}

export const snackBarSlice = createSlice({
    name: '@snackbar',
    initialState,
    reducers: {
        openSnackBar: (state: Draft<LayoutState>, action: PayloadAction<IActionsOpenSnackBar>) => {
            const { title, type, message } = action.payload
            state.open = true
            state.title = title
            state.type = type
            state.message = message
        },
        closeSnackBar: (state: Draft<LayoutState>) => {
            state.open = initialState.open
            state.title = initialState.title
            state.message = initialState.message
            state.type = initialState.type
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
 * @property {Function} openSnackBar
 * @property {Function} closeSnackBar
 */
export const {
    openSnackBar,
    closeSnackBar
} = snackBarSlice.actions

export default snackBarSlice.reducer
