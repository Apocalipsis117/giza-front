import { environment } from "src/environments/environment";

type QueryParams = { [key: string]: any };

export const apiHelper = {
    /**
     * Construye la URL completa de una API REST.
     * @param basePath ruta base (ej. 'entidades-administradoras')
     * @param options objeto con 'base' (endpoint) y 'params' (query params)
     * @returns string
     */
    api(basePath: string, options: { path?: string, params?: QueryParams } = {}) {
        const endpoint = [basePath, options.path].filter(Boolean).join('/');
        const query = options.params ? this.objectToQueryString(options.params) : '';
        return `${environment.API.main}${endpoint}${query}`;
    },

    login(path: string = '') {
        return `${environment.API.auth}${path}`;
    },

    objectToQueryString(params: QueryParams): string {
        const queryString = Object.entries(params)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join('&');
        return `?${queryString}`;
    }
};
