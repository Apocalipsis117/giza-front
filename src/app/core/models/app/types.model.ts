import { transform } from '@helpers/index';
import * as i from '@interfaces/index';

/**
 * TypeDniIps
 * tipo de identificacion ips
 */
export class TypeDniIps {
    static setProperty(dataInput: i.TypeDniIPSAPI): i.TypeDniIPSAPP {
        return new TypeDniIps(dataInput).data;
    }
    constructor(public dataInput: i.TypeDniIPSAPI) {}

    get data(): i.TypeDniIPSAPP {
        return {
            id: this.dataInput.id,
            name: this.dataInput.nombre,
            prefix: this.dataInput.tipo
        }
    }
}

/**
 * TypeVehicle
 */
export class TypeRepresentative {
    static setProperty(dataInput: i.TypeRepresentativeAPI): i.TypeRepresentativeAPP {
        return new TypeRepresentative(dataInput).data;
    }
    constructor(public dataInput: i.TypeRepresentativeAPI) {}

    get data(): i.TypeVehicleAPP {
        return {
            id: this.dataInput.codigo_id,
            name: this.dataInput.nombre
        };
    }
}


/**
 * TypeHisotry
 */
export class TypeHisotry {
    static setProperty(dataInput: i.TypeHistoryAPI): i.TypeHistoryAPP {
        return new TypeHisotry(dataInput).data;
    }

    constructor(public dataInput: i.TypeHistoryAPI) {}

    get data(): i.TypeHistoryAPP {
        return {
            id: this.dataInput.id,
            name: this.dataInput.nombre,
            withExt: this.dataInput.conExt,
            minAge: this.dataInput.edadMin,
            maxAge: this.dataInput.edadMax,
            gender: this.dataInput.pSexo,
            pyp: this.dataInput.pyp
        };
    }
}

/**
 * TypeRegime
 */
export class TypeRegime {
    static setProperty(dataInput: i.TypeRegimeAPI): i.TypeRegimeAPP {
        return new TypeRegime(dataInput).data;
    }

    constructor(public dataInput: i.TypeRegimeAPI) {}

    get data(): i.TypeRegimeAPP {
        return {
            id: this.dataInput.id,
            accountRad: this.dataInput.cuentaRad,
            accountxRad: this.dataInput.cuentaxRad,
            initial: this.dataInput.inicial,
            name: this.dataInput.nnombre
        };
    }
}

/**
 * Model test
 */
export class ModelTest {
    static setProperty(dataInput: any): any {
        return new ModelTest(dataInput).data;
    }

    constructor(public dataInput: any) {}

    get data(): any {
        return this.dataInput;
    }
}