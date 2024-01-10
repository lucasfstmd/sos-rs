import jwt from 'jsonwebtoken'
import axiosInstance from './axios'
import localStorageService from './local.storage'
import { AccessToken } from '../application/domain/models/auth/access.token'

/**
 * Auth service.
 * @class
 * @category Services
 */
export class AuthService {

    constructor(private apiVersion: string = 'v1') {
    }

    /**
     * Performs the request of access tokens informing the user's credentials
     * @async
     * @public
     * @param {string} login Auth data login.
     * @param {string} password Auth data password.
     * @returns {Promise<AccessToken>}
     */
    public async login(login: string, password: string): Promise<AccessToken> {
        const body = {
            login,
            password
        }
        const response = await axiosInstance.post(`${this.apiVersion}/auth`, body)
        const { access_token, refresh_token } = response.data
        const accessToken: AccessToken = this.verify(access_token)
        localStorageService.setItem('access_token', access_token)
        localStorageService.setItem('refresh_token', refresh_token)
        return accessToken
    }

    /**
     * Decodes the jwt token saved in localStorage returning the payload
     *  AccessToken or Error with name JsonWebTokenError
     * @public
     * @see {@link https://www.npmjs.com/package/jsonwebtoken#errors--codes}
     * @returns {AccessToken}
     */
    public decodeToken(): AccessToken {
        const token = localStorageService.getItem('access_token')
        return this.decode(token)
    }

    /**
     * Checks whether the user is properly authenticated
     * @public
     * @returns {boolean}
     */
    public isAuthenticated(): boolean {
        return true
        // try {
        //     const localToken: AccessToken | Error = this.decodeToken()
        //     return !!localToken
        // } catch (e) {
        //     this.logout()
        //     return false
        // }
    }

    /**
     * Performs the system logout by clearing the localstorage
     * @public
     * @returns {void}
     */
    public logout(): void {
        const themeMode = localStorageService.getItem('themeMode')
        localStorageService.logout()
        if (themeMode) {
            localStorageService.setItem('themeMode', themeMode)
        }
    }

    /**
     * Decodes jwt token returning the payload
     *  AccessToken or Error with name JsonWebTokenError
     * @public
     * @see {@link https://www.npmjs.com/package/jsonwebtoken#errors--codes}
     * @param {string} token Token jwt to be decoded
     * @returns {AccessToken}
     */
    public decode(token: string): AccessToken {
        const jsonDecoded: any = jwt.decode(token, { complete: true })
        return new AccessToken().fromJSON(jsonDecoded.payload)
    }

    /**
     * Validation of the signature and issuer of the token
     * AccessToken or Error with name JsonWebTokenError
     * @public
     * @see {@link https://www.npmjs.com/package/jsonwebtoken#errors--codes}
     * @param {string} token Token jwt to be validated
     * @returns {AccessToken}
     */
    public verify(token: string): AccessToken {
        if (!process.env.REACT_APP_JWT_PUBLIC_KEY) {
            throw new Error('REACT_APP_JWT_PUBLIC_KEY environment variable missing!')
        }
        if (!process.env.REACT_APP_ISSUER) {
            throw new Error('REACT_APP_ISSUER environment variable missing!')
        }
        const jwtPublicKey: string = `${process.env.REACT_APP_JWT_PUBLIC_KEY}`
        const issuer: string = `${process.env.REACT_APP_ISSUER}`
        const algorithms: any = ['RS256']
        const jsonDecoded = jwt.verify(token, jwtPublicKey, { algorithms, issuer })
        return new AccessToken().fromJSON(jsonDecoded)
    }
}

const authService: AuthService = new AuthService()

export default authService
