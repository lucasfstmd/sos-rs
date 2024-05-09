import { ISosState } from './types'
import { AsyncStateStatus } from '../root.types'
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { Sos } from '../../application/domain/models/entity/sos'

const initialState: ISosState = {
    request: {
        data: [],
        status: AsyncStateStatus.INITIAL,
    },
    create: {
        data: new Sos(),
        status: AsyncStateStatus.INITIAL
    },
    getOne: {
        data: new Sos(),
        status: AsyncStateStatus.INITIAL
    }
}

export const sosSlice = createSlice({
    name: '@sos',
    initialState,
    reducers: {
        sosRequest: (state: Draft<ISosState>) => {
            state.request.status = AsyncStateStatus.LOADING
        },
        sosSuccess: (state: Draft<ISosState>, action: PayloadAction<{ data: any} >) => {
            state.request.status = AsyncStateStatus.SUCCESS
            state.request.data = action.payload.data
        },
        sosFailure: (state: Draft<ISosState>) => {
            state.request.status = AsyncStateStatus.FAILURE
        },
        sosCreateRequest: (state: Draft<ISosState>) => {
            state.create.status = AsyncStateStatus.LOADING
        },
        sosCreateSuccess: (state: Draft<ISosState>, action: PayloadAction<{ data: any} >) => {
            state.create.status = AsyncStateStatus.SUCCESS
            state.create.data = action.payload.data
        },
        sosCreateFailure: (state: Draft<ISosState>) => {
            state.create.status = AsyncStateStatus.FAILURE
        }     ,
        sosOneRequest: (state: Draft<ISosState>) => {
            state.getOne.status = AsyncStateStatus.LOADING
        },
        sosOneSuccess: (state: Draft<ISosState>, action: PayloadAction<{ data: any} >) => {
            state.getOne.status = AsyncStateStatus.SUCCESS
            state.getOne.data = action.payload.data
        },
        sosOneFailure: (state: Draft<ISosState>) => {
            state.getOne.status = AsyncStateStatus.FAILURE
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
 * @property {Function} trainerRequest
 * @property {Function} trainerSuccess
 * @property {Function} trainerFailure
 */
export const SosActions = sosSlice.actions

export default sosSlice.reducer
