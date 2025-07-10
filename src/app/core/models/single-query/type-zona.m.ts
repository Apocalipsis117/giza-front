import { TypeZona_API, TypeZona_APP } from "@interfaces/single-query/type-zona.i";

export class TypeZone {
    static setProperty(input: TypeZona_API) {
        return new TypeZone(input).data;
    }
    constructor(public input: TypeZona_API) {}

    get data(): TypeZona_APP {
        const _ = this.input;
        return {
            id: _.id,
            initials: _.sigla,
            name: _.nombre
        };
    }
}