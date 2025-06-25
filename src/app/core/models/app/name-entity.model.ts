import { NamedEntityAPI, NamedEntityAPP } from '@interfaces/index';

export class NamedEntity {
    static setProperty(dataInput: NamedEntityAPI): NamedEntityAPP {
        return new NamedEntity(dataInput).data;
    }
    constructor(public dataInput: NamedEntityAPI) {}

    get data(): NamedEntityAPP {
        return {
            id: this.dataInput.id,
            name: this.dataInput.nombre
        }
    }
}