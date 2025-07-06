import { HospitalService_API, HospitalService_APP, HospitalService_APPDTO, HospitalService_DTO } from "@interfaces/index";
import { CostCenter } from "./cost-center.model";
import { NameIdEntity } from "../single-query/name-entity.m";


export class HospitalServiceDTO {
    static setProperty(input: HospitalService_APPDTO) {
        return new HospitalServiceDTO(input).data;
    }
    constructor(public input: HospitalService_APPDTO) {}

    get data() {
        const _ = this.input;
        const data: HospitalService_DTO = {
            edadMax: _.maxAge,
            edadMin: _.minAge,
            estado: _.status,
            nombre: _.name,
            numCamas: _.bedCount,
            sexoId: _.genderId,
            ambitoId: _.scopeId,
            centroCostoId: _.costCenterId,
        }
        return JSON.stringify(data);
    }
}

export class HospitalService {
    static setProperty(input: HospitalService_API) {
        return new HospitalService(input).data;
    }
    constructor(public input: HospitalService_API) {}

    get data(): HospitalService_APP {
        const _ = this.input;
        return {
            bedCount: _.numCamas,
            costCenter: CostCenter.setProperty(_.centroCosto),
            gender: NameIdEntity.setProperty(_.sexo),
            id: _.id,
            maxAge: _.edadMax,
            minAge: _.edadMin,
            name: _.nombre,
            scope: NameIdEntity.setProperty(_.ambito),
            status: _.estado
        };
    }
}