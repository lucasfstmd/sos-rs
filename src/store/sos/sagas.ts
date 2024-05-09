import { PayloadAction } from '@reduxjs/toolkit'
import { all, apply, put, takeLatest } from 'redux-saga/effects'
import { SosActions } from './index'
import { ISosAction, SosTypes } from './types'
import sosService from '../../services/sos'
import { Sos } from '../../application/domain/models/entity/sos'

export function* postSos(action: PayloadAction<ISosAction>) {
    const { sosCreateSuccess, sosCreateFailure } = SosActions
    try {
        const { payload } = action.payload
        const sos: any = yield apply(sosService, sosService.createSos, [payload as Sos])
        yield put(sosCreateSuccess({ data: sos }))
    } catch (err) {
        yield put(sosCreateFailure())
    }
}

export function* getSos() {
    const { sosFailure, sosSuccess } = SosActions
    try {
        const sos: Array<any> = yield apply(sosService, sosService.getSos, [])
        yield put(sosSuccess({ data: sos }))
    } catch (err) {
        yield put(sosFailure())
    }
}

export function* getOne(action: PayloadAction<ISosAction>) {
    const { sosOneSuccess, sosOneFailure } = SosActions
    try {
        const { id } = action.payload
        const sos: any = yield apply(sosService, sosService.getOne, [id as number])
        yield put(sosOneSuccess({ data: sos }))
    } catch (err) {
        yield put(sosOneFailure)
    }
}

const sosSaga = function* () {
    yield all([
        takeLatest(SosTypes.SOS_CREATE, postSos),
        takeLatest(SosTypes.SOS_REQUEST, getSos),
        takeLatest(SosTypes.SOS_ONE, getOne)
    ])
}

export default sosSaga
