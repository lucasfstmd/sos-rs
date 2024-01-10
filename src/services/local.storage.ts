import Crypto from './crypto'

/**
 * LocalStorage Service
 * Access interface to the browser's Storage location, added an encryption layer
 * @class
 * @category Services
 */
class LocalStorage {

    /**
     * Retrieves an item saved in localStorage
     * @public
     * @param {string} key Item identifier
     * @returns {string}
     */
    public getItem(key: string): string {
        const encryptedKey = Crypto.encryptKey(key)
        const encryptedItem = localStorage.getItem(encryptedKey.toString())
        return encryptedItem ? Crypto.decryptItem(encryptedItem) : ''
    }

    /**
     * Method to persist item in localStorage
     * @public
     * @param {string} key Item identifier
     * @param {string} item Item to be persisted
     * @returns {void}
     */
    public setItem(key: string, item: string): void {
        const encryptedKey = Crypto.encryptKey(key)
        const encryptedItem = Crypto.encryptItem(item)
        localStorage.setItem(encryptedKey, encryptedItem)
    }

    /**
     * Method to remove item in localStorage
     * @public
     * @param {string} key Item identifier
     * @returns {void}
     */
    public removeItem(key: string): void {
        const encryptedKey = Crypto.encryptKey(key)
        localStorage.removeItem(encryptedKey)
    }

    /**
     * Clean localStorage for secure logout
     * @public
     * @returns {void}
     */
    public logout(): void {
        localStorage.clear()
    }
}

const localStorageService: LocalStorage = new LocalStorage()

export default localStorageService
