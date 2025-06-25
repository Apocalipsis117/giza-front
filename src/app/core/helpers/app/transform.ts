import * as CryptoJS from 'crypto-js';
import { Observable, of } from 'rxjs';

export const transform = {
    encrypData(data: any, key: string): Observable<string> {
        return of(CryptoJS.AES.encrypt(JSON.stringify(data), key).toString())
    },
    descryptData(data: string, key: string): Observable<any> {
        const bytes = CryptoJS.AES.decrypt(data, key);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    },
    textPlural(textBase: any, setOptions: OptionsTextPlural) {
        const options = {
            textPlural: setOptions.textPlural ? setOptions.textPlural : '',
            textSingular: setOptions.textSingular ? setOptions.textSingular : '',
            quantity: setOptions.quantity ? setOptions.quantity : 0
        }
        const prefix = options.quantity > 1 ? options.textPlural : options.textSingular;
        return textBase + ' ' + prefix
    },
    capitalizeFirstLetter(text: string) {
        let lowerCaseText = text.toLowerCase();
        let textWithCapitalizedFirstLetter = lowerCaseText.charAt(0).toUpperCase() + lowerCaseText.slice(1);
        return textWithCapitalizedFirstLetter;
    }
}

interface OptionsTextPlural {
    textPlural: string;
    textSingular: string;
    quantity: number;
}