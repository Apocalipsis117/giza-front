import { DiagnosisGroup_API, DiagnosisGroup_APP, DiagnosisGroup_APPDTO, DiagnosisGroup_DTO } from "@interfaces/setting/diagnosis-group.i";
import { Diagnosis } from "@models/index";

export class DiagnosisGroupDTO {
    static setProperty(input: DiagnosisGroup_APPDTO) {
        return new DiagnosisGroupDTO(input).data;
    }
    constructor(public input: DiagnosisGroup_APPDTO) {}

    get data() {
        const _ = this.input;
        const data: DiagnosisGroup_DTO = {
            diagnosticosIds: _.diagnosisIds,
            nombre: _.name
        }
        return JSON.stringify(data);
    }
}

export class DiagnosisGroup {
    static setProperty(input: DiagnosisGroup_API) {
        return new DiagnosisGroup(input).data;
    }
    constructor(public input: DiagnosisGroup_API) {}

    get data(): DiagnosisGroup_APP {
        const _ = this.input;
        return {
            id: _.id,
            name: _.nombre,
            diagnoses: this.diagnoses()
        };
    }

    private diagnoses() {
        return this.input.diagnosticos.map(x => Diagnosis.setProperty(x));
    }
}