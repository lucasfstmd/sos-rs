import { AsyncStateStatus } from '../root.types'
import { Sos } from '../../application/domain/models/entity/sos'

export enum SosTypes {
    SOS_REQUEST = '@sos/sosRequest',
    SOS_CREATE = '@sos/sosCreateRequest',
    SOS_ONE = '@sos/sosOneRequest',
    SOS_DELETE = '@sos/sosDeleteRequest'
}

interface ISosRequest {
    data: Array<Sos>
    status: AsyncStateStatus
}

interface ISosCreate {
    data: Sos
    status: AsyncStateStatus
}

export interface ISosAction {
    payload?: Sos
    id?: number
}

export interface ISosState {
    request: ISosRequest
    create: ISosCreate
    getOne: ISosCreate
    delete: ISosCreate
}
