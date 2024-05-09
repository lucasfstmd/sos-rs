import axiosInstance from './axios'
import { AxiosResponse } from 'axios'
import { Sos } from '../application/domain/models/entity/sos'

export class SosService {
    constructor(private apiVersion: string = 'v1') {
    }

    public async createSos(sos: Sos): Promise<Sos> {
        return axiosInstance.post(`${this.apiVersion}/sos`, sos)
            .then((response: AxiosResponse) => new Sos().fromJSON(response.data))
    }

    public async getSos(): Promise<Sos[]> {
        return axiosInstance.get(`${this.apiVersion}/sos`)
            .then((response: AxiosResponse) => response.data.map((item: Sos) => new Sos().fromJSON(item)))
    }

    public async getOne(id: number): Promise<Sos> {
        return axiosInstance.get(`${this.apiVersion}/sos/${id}`)
            .then((response: AxiosResponse) => new Sos().fromJSON(response.data))
    }
}

const sosService = new SosService()

export default sosService
