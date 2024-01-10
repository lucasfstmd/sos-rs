import CryptoJS from 'crypto-js'

const LS_SECRET_KEY: string = `${process.env.REACT_APP_LS_SECRET_KEY}`

/**
 * @class
 * @category Services
 */
class Crypto {

    /**
     * Encrypt a base64 string]
     * @public
     * @static
     * @param {string} str String to be encrypted
     * @returns {string}
     */
    public static encryptKey(str: string): string {
        return btoa(str)
    }

    /**
     * Encrypts a string using the Crypto.AES algorithm
     * @public
     * @static
     * @param {string} str String to be encrypted
     * @returns {string}
     */
    public static encryptItem(str: string): string {
        const encrypted = CryptoJS.AES.encrypt(str, LS_SECRET_KEY)
        return encrypted.toString()
    }

    /**
     * Decrypts a string using the Crypto.AES algorithm
     * @public
     * @static
     * @param encrypted, String to be decrypted
     * @returns {string}
     */
    public static decryptItem(encrypted: string): string {
        const decrypted = CryptoJS.AES.decrypt(encrypted, LS_SECRET_KEY)
        return decrypted.toString(CryptoJS.enc.Utf8)
    }
}

export default Crypto
