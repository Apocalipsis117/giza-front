export const ngFormHelper = {
    unboxProperties<T extends Record<string, any[]>>(obj: T): { [K in keyof T]: T[K][0] } {
        const result: { [K in keyof T]?: T[K][0] } = {};

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = obj[key][0];
            }
        }

        return result as { [K in keyof T]: T[K][0] };
    }
}