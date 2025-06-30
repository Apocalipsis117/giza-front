import { CostCenter_API, CostCenter_APP, CostCenter_APPDTO, CostCenter_DTO } from '@interfaces/index';
import { NamedEntity } from '@models/index';

export class CostCenterDTO {
    static setProperty(dataInput: CostCenter_APPDTO) {
        return new CostCenterDTO(dataInput).data;
    }
    constructor(public dataInput: CostCenter_APPDTO) {}

    get data(): string {
        const data: CostCenter_DTO = {
            areaId: this.dataInput.areaId,
            cuentaContable: this.dataInput.accountingAccount,
            estado: this.dataInput.status,
            nombre: this.dataInput.name
        }
        return JSON.stringify(data);
    }
}

export class CostCenter {
    static setProperty(dataInput: CostCenter_API) {
        return new CostCenter(dataInput).data;
    }
    constructor(public dataInput: CostCenter_API) {}

    get data(): CostCenter_APP {
        return {
            accountingAccount: this.dataInput.cuentaContable,
            area: this.dataInput.area ? NamedEntity.setProperty(this.dataInput.area) : null,
            id: this.dataInput.id,
            name: this.dataInput.nombre,
            status: this.dataInput.estado
        }
    }
}