import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationPT from './assets/locales/pt/translation.json'
import { ptBR } from '@mui/material/locale'

/**
 * <h5>System translation support configuration file</h5>
 * @category Source
 * @subcategory Language
 * @typedef Language
 * @namespace Language
 */

/**
 * Language supported by the system
 * @memberof Language
 * @enum {string}
 */
export enum LanguageOptions {
    /** @type {string} */
    PT_BR = 'pt-BR'
}

/**
 * @memberof Language
 * @constant {object}
 */
export const MAP_ENUM_TO_LANGUAGE = {
    [LanguageOptions.PT_BR]: 'pt'
}

/**
 * @memberof Language
 * @constant {object}
 */
export const parseStringToEnumLanguage = (value: string): LanguageOptions => {
    switch (value) {
        case 'pt-BR':
            return LanguageOptions.PT_BR

        default:
            return LanguageOptions.PT_BR
    }
}

/**
 * @memberof Language
 * @constant {object}
 */
export const MAP_LANGUAGE_TO_ENUM = {
    'pt': [LanguageOptions.PT_BR]
}

/**
 * @memberof Language
 * @constant {object}
 */
export const MAP_ENUM_TO_LOCALE = {
    [LanguageOptions.PT_BR]: ptBR
}

/**
 * Constant that receives translation files defined by languages
 * @memberof Language
 * @constant
 */
const resources = {
    pt: {
        translation: translationPT
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: MAP_ENUM_TO_LANGUAGE[LanguageOptions.PT_BR],
        lng: MAP_ENUM_TO_LANGUAGE[LanguageOptions.PT_BR],
        interpolation: {
            escapeValue: false
        },
        react: {
            bindI18n: 'languageChanged'
        }
    })

export default i18n
