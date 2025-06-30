import { TypeRegime_API, TypeRegime_APP } from '@interfaces/index';

/**
 * TypeRegime
 */
export class TypeRegime {
    static setProperty(input: TypeRegime_API) {
        return new TypeRegime(input).data;
    }

    constructor(public input: TypeRegime_API) {}

    get data(): TypeRegime_APP {
        return {
            id: this.input.id,
            accountRad: this.input.cuentaRad,
            accountxRad: this.input.cuentaxRad,
            initial: this.input.inicial,
            name: this.input.nombre
        };
    }
}