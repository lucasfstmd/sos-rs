import { JsonUtils } from '../../utils/json.util'

/**
 * @class
 * @category Models
 * @subcategory auth
 * @property {string} [sub]
 * @property {string} [sub_type]
 * @property {string} [iss]
 * @property {number} [exp]
 * @property {number} [iat]
 * @property {string} [scope]
 * @property {boolean} [reset_password]
 * @property {string} [email]
 */
export class AccessToken {
    private _sub: string | undefined
    private _sub_type: string | undefined
    private _iss: string | undefined
    private _exp: number | undefined
    private _iat: number | undefined
    private _scope: string | undefined
    private _reset_password: boolean | undefined
    private _email: string | undefined

    get sub(): string | undefined {
        return this._sub
    }

    set sub(value: string | undefined) {
        this._sub = value
    }

    get sub_type(): string | undefined {
        return this._sub_type
    }

    set sub_type(value: string | undefined) {
        this._sub_type = value
    }

    get iss(): string | undefined {
        return this._iss
    }

    set iss(value: string | undefined) {
        this._iss = value
    }

    get exp(): number | undefined {
        return this._exp
    }

    set exp(value: number | undefined) {
        this._exp = value
    }

    get iat(): number | undefined {
        return this._iat
    }

    set iat(value: number | undefined) {
        this._iat = value
    }

    get scope(): string | undefined {
        return this._scope
    }

    set scope(value: string | undefined) {
        this._scope = value
    }

    get reset_password(): boolean | undefined {
        return this._reset_password
    }

    set reset_password(value: boolean | undefined) {
        this._reset_password = value
    }

    get email(): string | undefined {
        return this._email
    }

    set email(value: string | undefined) {
        this._email = value
    }

    public fromJSON(json: any): AccessToken {
        if (!json) {
            return this
        }
        if (typeof json === 'string') {
            if (!JsonUtils.isJsonString(json)) {
                return this
            }
            json = JSON.parse(json)
        }

        if (json.sub !== undefined) {
            this.sub = json.sub
        }

        if (json.sub_type !== undefined) {
            this.sub_type = json.sub_type
        }

        if (json.iss !== undefined) {
            this.iss = json.iss
        }

        if (json.exp !== undefined) {
            this.exp = json.exp
        }

        if (json.iat !== undefined) {
            this.iat = json.iat
        }

        if (json.scope !== undefined) {
            this.scope = json.scope
        }

        if (json.reset_password !== undefined) {
            this.reset_password = json.reset_password
        }

        if (json.email !== undefined) {
            this.email = json.email
        }

        return this
    }

    public toJSON(): any {
        return {
            sub: this.sub ? this.sub : undefined,
            sub_type: this.sub_type ? this.sub_type : undefined,
            iss: this.iss ? this.iss : undefined,
            exp: this.exp ? this.exp : undefined,
            iat: this.iat ? this.iat : undefined,
            scope: this.scope ? this.scope : undefined,
            reset_password: this.reset_password ? this.reset_password : undefined,
            email: this.email ? this.email : undefined
        }
    }
}

export const RESET_TOKEN_ERROR = {
    code: 401,
    message: 'Invalid password reset token!',
    description: 'Token probably expired or already used. You can only use the reset token once while it is within its validity period.'
}
