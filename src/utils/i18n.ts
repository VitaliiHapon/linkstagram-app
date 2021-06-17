import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import common_en from '../translations/en/translation.json';
import common_ua from '../translations/ua/translation.json';

export const languages = [
    "en","ua","ru","pl","de"
]
export function saveLanguage(lang: string){
    localStorage.setItem("i18n-selected-language", lang);
}

export function getLanguage(): string | null{
    return localStorage.getItem("i18n-selected-language");
}

i18n
    .use(initReactI18next)
    .init({
        interpolation: { escapeValue: false },
        lng: 'en',
        debug: true,

        ns: ["translations"],
        defaultNS: "translations",
        resources: {
            en: {
                translations: common_en
            },
            ua: {
                translations: common_ua
            }
        },

        react: {
            wait: true
        }
    }, ()=> {
        if(getLanguage() != null)
            i18n.changeLanguage(getLanguage() as string)
    });

export default i18n;
