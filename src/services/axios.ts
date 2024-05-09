import { Agent } from 'https'
import axios, { AxiosInstance } from 'axios'

/**
 * @class
 * @category Services
 */
class Axios {

    /**
     * Static method that will return the axios instance
     * @public
     * @static
     * @returns {AxiosInstance}
     */
    public static getInstance(): AxiosInstance {
        if (!this._instance) {
            this._instance = axios.create({
                baseURL: 'http://localhost:8080/',
                httpsAgent: new Agent({ rejectUnauthorized: false })
            })
        }
        return this._instance
    }

    private static _instance: AxiosInstance

}

export default Axios.getInstance()
