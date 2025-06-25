import { environment } from "src/environments/environment"
import { generator } from "./generator";

export const queries = {
    /**
     * @return string url API
     * @param string concat api
     */
    api(path: string, objParam: any | null = null) {
        const params = objParam ? generator.objectToQueryString(objParam) : '';
        return environment.API.main + path + params;
    },
    paramsPage: {
        page: 0,
        size: 10
    }
}