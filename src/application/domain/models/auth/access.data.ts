import { JsonUtils } from '../../utils/json.util'

/**
 * @class
 * @category Models
 * @subcategory auth
 * @property {string} [access_token]
 * @property {string} [refresh_token]
 */
export class AccessData {
    private _access_token: string | undefined
    private _refresh_token: string | undefined

    get access_token(): string | undefined {
        return this._access_token
    }

    set access_token(value: string | undefined) {
        this._access_token = value
    }

    get refresh_token(): string | undefined {
        return this._refresh_token
    }

    set refresh_token(value: string | undefined) {
        this._refresh_token = value
    }

    public fromJSON(json: any): AccessData {
        if (!json) {
            return this
        }
        if (typeof json === 'string') {
            if (!JsonUtils.isJsonString(json)) {
                return this
            }
            json = JSON.parse(json)
        }

        if (json.access_token !== undefined) {
            this.access_token = json.access_token
        }

        if (json.refresh_token !== undefined) {
            this.refresh_token = json.refresh_token
        }

        return this
    }

    public toJSON(): any {
        return {
            access_token: this.access_token ? this.access_token : undefined,
            refresh_token: this.refresh_token ? this.refresh_token : undefined
        }
    }
}
