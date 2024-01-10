import { UserType } from '../../utils/user.type'
import { Entity } from '../entity/user'

export class User extends Entity {
    private _name: string | undefined
    private _last_login: string | undefined
    private _type: UserType | undefined

    get name(): string | undefined {
        return this._name
    }

    set name(value: string | undefined) {
        this._name = value
    }

    get last_login(): string | undefined {
        return this._last_login
    }

    set last_login(value: string | undefined) {
        this._last_login = value
    }

    get type(): UserType | undefined {
        return this._type
    }

    set type(value: UserType | undefined) {
        this._type = value
    }

    public fromJSON(json: any): User {
        super.fromJSON(json)

        if (json.name !== undefined) {
            this.name = json.name
        }

        if (json.last_login !== undefined) {
            this.last_login = json.last_login
        }

        if (json.type !== undefined) {
            this.type = json.type
        }

        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            name: this.name || undefined,
            last_login: this.last_login || undefined,
            type: this.type || undefined
        }
    }
}
