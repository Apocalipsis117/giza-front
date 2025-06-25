import { HospitalServiceAPI, HospitalServiceAPP, HospitalServiceDTO_API, HospitalServiceDTO_APP } from "@interfaces/index";
import { CostCenter } from "./cost-center.model";
import { NamedEntity } from "@models/index";

export class HoospitalServiceDTO {
    static setProperty(dataInput: HospitalServiceDTO_APP): string {
        return new HoospitalServiceDTO(dataInput).data;
    }
    constructor(public dataInput: HospitalServiceDTO_APP) {}

    get data(): string {
        const data: HospitalServiceDTO_API = {
            nombre: this.dataInput.name,
            edadMin: this.dataInput.minAge,
            edadMax: this.dataInput.maxAge,
            estado: this.dataInput.isActive,
            numCamas: this.dataInput.bedCount,
            sexoId: this.dataInput.genderId,
            ambitoId: this.dataInput.scopeId,
            centroCostoId: this.dataInput.costCenterId
        }
        return JSON.stringify(data);
    }
}


export class HospitalService {
    static setProperty(dataInput: HospitalServiceAPI): HospitalServiceAPP {
        return new HospitalService(dataInput).data;
    }
    constructor(public dataInput: HospitalServiceAPI) {}

    get data(): HospitalServiceAPP {
        return {
            bedCount: this.dataInput.numCamas,
            costCenter: CostCenter.setProperty(this.dataInput.centroCosto),
            gender: NamedEntity.setProperty(this.dataInput.sexo),
            id: this.dataInput.id,
            isActive: this.dataInput.estado,
            maxAge: this.dataInput.edadMax,
            minAge: this.dataInput.edadMin,
            name: this.dataInput.nombre,
            scope: NamedEntity.setProperty(this.dataInput.ambito)
        };
    }
}