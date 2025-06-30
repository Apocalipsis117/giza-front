import { TypeHistory_API, TypeHistory_APP } from "@interfaces/single-query/type-history.i";

export class TypeHistory {
    static setProperty(input: TypeHistory_API) {
        return new TypeHistory(input).data;
    }
    constructor(public input: TypeHistory_API) {}

    get data(): TypeHistory_APP {
        return {
            allowedSex: this.input.psexo,
            id: this.input.id,
            maxAge: this.input.edadMax,
            minAge: this.input.edadMin,
            name: this.input.nombre,
            pyp: this.input.pyp,
            withExtension: this.input.conExt
        };
    }
}