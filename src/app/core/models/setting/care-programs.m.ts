import { CarePrograms_API, CarePrograms_APP, CarePrograms_APPDTO, CarePrograms_DTO } from "@interfaces/index";
import { Gender, TypeHistory } from "@models/index";
import { Diagnosis } from "./diagnosis.m";
import { ServicePrograms, ServiceProgramsDTO } from "./service-programs.m";

export class CareProgramsDTO {
    static setProperty(input: CarePrograms_APPDTO) {
        return new CareProgramsDTO(input).data;
    }
    constructor(public input: CarePrograms_APPDTO) {}

    get data() {
        const _ = this.input;
        const data: CarePrograms_DTO = {
            diagnosticoIds: _.diagnosisIds,
            edadMax: String(_.maxAge),
            edadMin: String(_.minAge),
            nombre: _.name,
            nombreCorto: _.shortName,
            sexoId: _.genderId,
            tipoHistoriaIds: _.historyTypeIds,
            programaServicios:  this.programServices
        }
        return JSON.stringify(data);
    }

    private get programServices() {
        return this.input.programServices.map(x => ServiceProgramsDTO.setProperty(x, false))
    }
}

export class CarePrograms {
    static setProperty(input: CarePrograms_API) {
        return new CarePrograms(input).data;
    }
    constructor(public input: CarePrograms_API) {}

    get data(): CarePrograms_APP {
        const _ = this.input;
        return {
            diagnoses: this.diagnoses,
            gender: Gender.setProperty(_.sexo),
            historyTypes: this.historyTypes,
            id: _.id,
            maxAge: Number(_.edadMax),
            minAge: Number(_.edadMin),
            name: _.nombre,
            programServices: this.programServices,
            shortName: _.nombreCorto
        };
    }

    private get historyTypes() {
        return this.input.tipoHistorias.map(x => TypeHistory.setProperty(x))
    }
    private get diagnoses() {
        return this.input.diagnosticos.map(x => Diagnosis.setProperty(x))
    }
    private get programServices() {
        return this.input.programasServicios.map(x => ServicePrograms.setProperty(x))
    }
}