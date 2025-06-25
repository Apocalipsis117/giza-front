import { OxigenRateAPI, OxigenRateDTO_API } from '@interfaces/index';
import { OxigenRateAPP, OxygenRateDTO_APP } from '@interfaces/app';
import { Medicine } from '@models/index';

export class OxygenRateDTO {
    static setProperty(dataInput: OxygenRateDTO_APP): string {
        return new OxygenRateDTO(dataInput).data;
    }
    constructor(public dataInput: OxygenRateDTO_APP) {}

    get data(): string {
        const data: OxigenRateDTO_API = {
            estado: this.dataInput.status,
            medicamentoId: this.dataInput.medicationId,
            nombre: this.dataInput.name,
            valor: this.dataInput.value
        }
        return JSON.stringify(data);
    }
}

export class OxygenRate {
    static setProperty(dataInput: OxigenRateAPI): OxigenRateAPP {
        return new OxygenRate(dataInput).data;
    }
    constructor(public dataInput: OxigenRateAPI) {}

    get data(): OxigenRateAPP {
        return {
            id: this.dataInput.id,
            name: this.dataInput.nombre,
            status: this.dataInput.estado,
            value: this.dataInput.valor,
            medication: Medicine.setProperty(this.dataInput.medicamento)
        }
    }
}