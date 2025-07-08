import { ProcedurePyp_API, ProcedurePyp_APP, ProcedurePyp_APPDTO, ProcedurePyp_DTO } from "@interfaces/index";
import { NameIdEntity } from "@models/index";

export class ProcedurePypDTO {
    static setProperty(input: ProcedurePyp_APPDTO) {
        return new ProcedurePypDTO(input).data;
    }
    constructor(public input: ProcedurePyp_APPDTO) {}

    get data() {
        const _ = this.input;
        const data: ProcedurePyp_DTO = {
            codigo: _.code,
            nombre: _.name,
            tipoServicioPyPId: _.pypServiceTypeId
        }
        return JSON.stringify(data);
    }
}

export class ProcedurePyp {
    static setProperty(input: ProcedurePyp_API) {
        return new ProcedurePyp(input).data;
    }
    constructor(public input: ProcedurePyp_API) {}

    get data(): ProcedurePyp_APP {
        const _ = this.input;
        return {
            code: _.codigo,
            id: _.id,
            name: _.nombre,
            pypServiceType: NameIdEntity.setProperty(_.tipoServicioPyP)
        };
    }
}