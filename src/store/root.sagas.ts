import { all, fork } from 'redux-saga/effects'
import authSaga from './auth/sagas'

/**
 * <h5>The root sagas is a combination of all the functionality sagas.</p>
 * @see {@link https://redux-saga.js.org}
 * @see {@link https://redux-saga.js.org/docs/advanced/RootSaga/}
 * @typedef RootSagas
 * @namespace RootSagas
 * @category React
 * @subcategory Redux / Sagas
 */

/**
 * A root Saga aggregates multiple Sagas to a single entry point for the sagaMiddleware to run.
 * @memberof RootSagas
 * @alias RootSagas.rootSaga
 * @function
 * @category React
 * @subcategory Redux / Sagas
 * @returns {*}
 */
const rootSaga = function* () {
    yield all([
        fork(authSaga)
    ])
}

export default rootSaga
