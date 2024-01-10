export class JsonUtils {

    public static isJsonString(str: string): boolean {
        try {
            return typeof JSON.parse(str) === 'object'
        } catch (e) {
            return false
        }
    }
}
