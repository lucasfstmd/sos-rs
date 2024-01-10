import { Action, ThunkAction } from '@reduxjs/toolkit'

import store from './index'

export enum AsyncStateStatus {
    INITIAL = 'INITIAL',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
}

export type ApplicationState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ApplicationState, unknown, Action<string>>
