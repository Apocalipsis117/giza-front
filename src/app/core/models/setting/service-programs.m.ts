import { ServicePrograms_API, ServicePrograms_APP, ServicePrograms_APPDTO, ServicePrograms_DTO } from "@interfaces/index";
import { Gender, NameIdEntity, OutpatientClinic } from "@models/index";

export class ServiceProgramsDTO {
    static setProperty(input: ServicePrograms_APPDTO, isJson: true): string;
    static setProperty(input: ServicePrograms_APPDTO, isJson?: false): ServicePrograms_DTO;
    static setProperty(input: ServicePrograms_APPDTO, isJson: boolean = true): string | ServicePrograms_DTO {
        const d = new ServiceProgramsDTO(input);
        return isJson ? d.dataJson : d.data;
    }
    constructor(public input: ServicePrograms_APPDTO) {}

    get data() {
        const _ = this.input;
        const data: ServicePrograms_DTO = {
            causaExternaId: _.externalCauseId,
            codigo: _.code,
            componente: _.component,
            edadMax: String(_.maxAge),
            edadMin: String(_.minAge),
            finalidadConsultaId: _.consultationPurposeId,
            nombre: _.name,
            programasAtencionId: _.careProgramsId,
            sexoId: _.genderId
        }
        return data;
    }
    get dataJson() {
        return JSON.stringify(this.data);
    }
}

export class ServicePrograms {
    static setProperty(input: ServicePrograms_API) {
        return new ServicePrograms(input).data;
    }
    constructor(public input: ServicePrograms_API) {}

    get data(): ServicePrograms_APP {
        const _ = this.input;
        return {
            carePrograms: _.programasAtencion,
            code: _.codigo,
            component: _.componente,
            consultationPurpose: NameIdEntity.setProperty(_.finalidadConsulta),
            gender: Gender.setProperty(_.sexo),
            externalCause: OutpatientClinic.setProperty(_.causaExterna),
            id: _.id,
            maxAge: Number(_.edadMax),
            minAge: Number(_.edadMin),
            name: _.nombre
        };
    }
}