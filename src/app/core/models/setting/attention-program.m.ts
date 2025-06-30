import { AttentionProgram_API, AttentionProgram_APP, AttentionProgram_APPDTO, AttentionProgram_DTO } from "@interfaces/index";
import { CostCenter } from "./cost-center.model";
import { Gender, TypeHistory } from "@models/index";

export class AttentionProgramDTO {
    static setProperty(input: AttentionProgram_APPDTO) {
        return new AttentionProgramDTO(input).data;
    }
    constructor(public input: AttentionProgram_APPDTO) {}

    get data() {
        const data: AttentionProgram_DTO = {
            centroCostoId: this.input.costCenterId,
            edadMax: this.input.maxAge,
            edadMin: this.input.minAge,
            nombre: this.input.name,
            nombreCorto: this.input.shortName,
            sexoId: this.input.genderId,
            tipoHistoriaId: this.input.historyTypeId
        }
        return JSON.stringify(data);
    }
}

export class AttentionProgram {
    static setProperty(input: AttentionProgram_API) {
        return new AttentionProgram(input).data;
    }
    constructor(public input: AttentionProgram_API) {}

    get data(): AttentionProgram_APP {
        return {
            costCenter: CostCenter.setProperty(this.input.centroCosto),
            gender: Gender.setProperty(this.input.sexo),
            historyType: TypeHistory.setProperty(this.input.tipoHistoria),
            id: this.input.id,
            maxAge: this.input.edadMax,
            minAge: this.input.edadMin,
            name: this.input.nombre,
            shortName: this.input.nombreCorto
        };
    }
}