import { Gender_API, Gender_APP } from "@interfaces/single-query/gender.i";

export class Gender {
    static setProperty(input: Gender_API) {
        return new Gender(input).data;
    }
    constructor(public input: Gender_API) {}

    get data(): Gender_APP {
        return {
            id: this.input.id,
            name: this.input.nombre,
            prefix: this.input.inicial
        };
    }
}