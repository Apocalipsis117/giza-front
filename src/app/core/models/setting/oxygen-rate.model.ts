import { OxygenRate_API, OxygenRate_APP, OxygenRate_APPDTO, OxygenRate_DTO } from '@interfaces/index';
import { Medicine } from '@models/index';

export class OxygenRateDTO {
    static setProperty(dataInput: OxygenRate_APPDTO) {
        return new OxygenRateDTO(dataInput).data;
    }
    constructor(public dataInput: OxygenRate_APPDTO) {}

    get data(): string {
        const data: OxygenRate_DTO = {
            estado: this.dataInput.status,
            medicamentoId: this.dataInput.medicineId,
            nombre: this.dataInput.name,
            valor: this.dataInput.value
        }
        return JSON.stringify(data);
    }
}

export class OxygenRate {
    static setProperty(dataInput: OxygenRate_API) {
        return new OxygenRate(dataInput).data;
    }
    constructor(public dataInput: OxygenRate_API) {}

    get data(): OxygenRate_APP {
        return {
            id: this.dataInput.id,
            name: this.dataInput.nombre,
            status: this.dataInput.estado,
            value: this.dataInput.valor,
            medicine: Medicine.setProperty(this.dataInput.medicamento)
        }
    }
}