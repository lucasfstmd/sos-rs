import { JsonUtils } from '../../utils/json.util'

export class Sos{
    private _id: string | undefined
    private _urgencia: string | undefined
    private _unidade: string | undefined
    private _necessidades: Array<string> | undefined
    private _sobressalentes: Array<string> | undefined
    private _pessoas: any | undefined
    private _contatos: Array<string> | undefined
    private _localizacao: any | undefined

    get id(): string | undefined {
        return this._id
    }

    set id(value: string | undefined) {
        this._id = value
    }

    get urgencia(): string | undefined {
        return this._urgencia
    }

    set urgencia(value: string | undefined) {
        this._urgencia = value
    }

    get unidade(): string | undefined {
        return this._unidade
    }

    set unidade(value: string | undefined) {
        this._unidade = value
    }

    get necessidades(): Array<string> | undefined {
        return this._necessidades
    }

    set necessidades(value: Array<string> | undefined) {
        this._necessidades = value
    }

    get sobressalentes(): Array<string> | undefined {
        return this._sobressalentes
    }

    set sobressalentes(value: Array<string> | undefined) {
        this._sobressalentes = value
    }

    get pessoas(): any {
        return this._pessoas
    }

    set pessoas(value: any) {
        this._pessoas = value
    }

    get contatos(): Array<string> | undefined {
        return this._contatos
    }

    set contatos(value: Array<string> | undefined) {
        this._contatos = value
    }

    get localizacao(): any {
        return this._localizacao
    }

    set localizacao(value: any) {
        this._localizacao = value
    }

    public fromJSON(json: any): Sos {
        if (!json) {
            return this
        }
        if (typeof json === 'string') {
            if (!JsonUtils.isJsonString(json)) {
                return this
            }
            json = JSON.parse(json)
        }

        if (json._id !== undefined) {
            this.id = json._id
        }
        if (json.urgencia !== undefined) {
            this.urgencia = json.urgencia
        }
        if (json.unidade !== undefined) {
            this.unidade = json.unidade
        }
        if (json.necessidades !== undefined) {
            this.necessidades = json.necessidades
        }
        if (json.sobressalentes !== undefined) {
            this.sobressalentes = json.sobressalentes
        }
        if (json.pessoas !== undefined) {
            this.pessoas = json.pessoas
        }
        if (json.contatos !== undefined) {
            this.contatos = json.contatos
        }
        if (json.localizacao !== undefined) {
            this.localizacao = json.localizacao
        }

        return this
    }

    public toJSON(): any {
        return {
            id: this.id || undefined,
            urgencia: this.urgencia || undefined,
            unidade: this.unidade || undefined,
            necessidades: this.necessidades || undefined,
            sobressalentes: this.sobressalentes || undefined,
            pessoas: this.pessoas || undefined,
            contatos: this.contatos || undefined,
            localizacao: this.localizacao || undefined,
        }
    }
}
