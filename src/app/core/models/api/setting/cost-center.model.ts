import { CostCenterAPI, CostCenterAPP, CostCenterDTO_API, CostCenterDTO_APP } from '@interfaces/index';
import { NamedEntity } from '@models/index';

export class CostCenterDTO {
    static setProperty(dataInput: CostCenterDTO_APP): string {
        return new CostCenterDTO(dataInput).data;
    }
    constructor(public dataInput: CostCenterDTO_APP) {}

    get data(): string {
        const data: CostCenterDTO_API = {
            areaId: this.dataInput.areaId,
            cuentaContable: this.dataInput.accountingAccount,
            estado: this.dataInput.status,
            nombre: this.dataInput.name
        }
        return JSON.stringify(data);
    }
}

export class CostCenter {
    static setProperty(dataInput: CostCenterAPI): CostCenterAPP {
        return new CostCenter(dataInput).data;
    }
    constructor(public dataInput: CostCenterAPI) {}

    get data(): CostCenterAPP {
        return {
            accountingAccount: this.dataInput.cuentaContable,
            area: this.dataInput.area ? NamedEntity.setProperty(this.dataInput.area) : null,
            id: this.dataInput.id,
            name: this.dataInput.nombre,
            status: this.dataInput.estado
        }
    }
}