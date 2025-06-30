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