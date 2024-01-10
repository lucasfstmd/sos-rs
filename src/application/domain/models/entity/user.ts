import { JsonUtils } from '../../utils/json.util'

export class Entity {
    private _id: string | undefined
    private _created_at: string | undefined
    private _updated_at: string | undefined

    get id(): string | undefined {
        return this._id
    }

    set id(value: string | undefined) {
        this._id = value
    }

    get created_at(): string | undefined {
        return this._created_at
    }

    set created_at(value: string | undefined) {
        this._created_at = value
    }

    get updated_at(): string | undefined {
        return this._updated_at
    }

    set updated_at(value: string | undefined) {
        this._updated_at = value
    }

    public fromJSON(json: any): Entity {
        if (!json) {
            return this
        }
        if (typeof json === 'string') {
            if (!JsonUtils.isJsonString(json)) {
                return this
            }
            json = JSON.parse(json)
        }

        if (json.id !== undefined) {
            this.id = json.id
        }

        if (json.created_at !== undefined) {
            this.created_at = json.created_at
        }

        if (json.updated_at !== undefined) {
            this.updated_at = json.updated_at
        }

        return this
    }

    public toJSON(): any {
        return {
            id: this.id || undefined,
            created_at: this.created_at || undefined,
            updated_at: this.updated_at || undefined
        }
    }
}
