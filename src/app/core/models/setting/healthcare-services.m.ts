import { HealthcareServices_API, HealthcareServices_APP, HealthcareServices_APPDTO, HealthcareServices_DTO } from "@interfaces/index";
import { TypeHistory } from "@models/index";
import { NameStateEntity } from "../single-query/name-entity.m";

export class HealthcareServicesDTO {
    static setProperty(input: HealthcareServices_APPDTO) {
        return new HealthcareServicesDTO(input).data;
    }
    constructor(public input: HealthcareServices_APPDTO) {}

    get data() {
        const data: HealthcareServices_DTO = {
            activaInstitucion: this.input.institutionActive,
            citas: this.input.appointments,
            codigoIndicador: this.input.indicatorCode,
            consultas: this.input.consultations,
            diasOportunidad: this.input.opportunityDays,
            especialistas: this.input.specialists,
            medicamentos: this.input.medicines,
            medico: this.input.doctor,
            nivelServicioId: this.input.serviceLevelId,
            nombre: this.input.name,
            otrosServicios: this.input.otherServices,
            procedimientos: this.input.procedures,
            rcirugia: this.input.surgery,
            recibir: this.input.receive,
            tipoHistoriaId: this.input.historyTypeId,
            tipoServicioId: this.input.serviceLevelId
        }
        return JSON.stringify(data);
    }
}

export class HealthcareServices {
    static setProperty(input: HealthcareServices_API) {
        return new HealthcareServices(input).data;
    }
    constructor(public input: HealthcareServices_API) {}

    get data(): HealthcareServices_APP {
        return {
            appointments: this.input.citas,
            consultations: this.input.consultas,
            doctor: this.input.medico,
            id: this.input.id,
            indicatorCode: this.input.codigoIndicador,
            institutionActive: this.input.activaInstitucion,
            medicines: this.input.medicamentos,
            name: this.input.nombre,
            opportunityDays: this.input.diasOportunidad,
            otherServices: this.input.otrosServicios,
            procedures: this.input.procedimientos,
            receive: this.input.recibir,
            specialists: this.input.especialistas,
            surgery: this.input.rcirugia,
            historyType: TypeHistory.setProperty(this.input.tipoHistoria),
            serviceType: NameStateEntity.setProperty(this.input.tipoServicio),
            serviceLevel: NameStateEntity.setProperty(this.input.nivelServicio),
        };
    }
}