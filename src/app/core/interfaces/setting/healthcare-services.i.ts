import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { NameStateEntity_API, NameStateEntity_APP, TypeHistory_API, TypeHistory_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
interface Base_API {
    nombre:            string;
    diasOportunidad:   number;
    codigoIndicador:   number;
    activaInstitucion: boolean;
    citas:             boolean;
    recibir:           boolean;
    medico:            boolean;
    rcirugia:          boolean;
    especialistas:     boolean;
    medicamentos:      boolean;
    otrosServicios:    boolean;
    consultas:         boolean;
    procedimientos:    boolean;
}

export interface HealthcareServices_DTO extends Base_API {
    tipoHistoriaId:    number;
    tipoServicioId:    number;
    nivelServicioId:   number;
}

export interface HealthcareServices_API extends Base_API {
    id:                number;
    tipoHistoria:      TypeHistory_API;
    tipoServicio:      NameStateEntity_API;
    nivelServicio:     NameStateEntity_API;
}

export interface HealthcareServices_PageResponse extends ResponseAPI<PageAPI<HealthcareServices_API>> {}
export interface HealthcareServices_PageAPI extends PageAPI<HealthcareServices_API> {}
export interface HealthcareServices_ListResponse extends ResponseAPI<HealthcareServices_API[]> {}
export interface HealthcareServices_Response extends ResponseAPI<HealthcareServices_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
interface Base_APP {
    name:              string; // nombre
    opportunityDays:   number; // diasOportunidad
    indicatorCode:     number; // codigoIndicador
    institutionActive: boolean; // activaInstitucion
    appointments:      boolean; // citas
    receive:           boolean; // recibir
    doctor:            boolean; // medico
    surgery:           boolean; // rcirugia
    specialists:       boolean; // especialistas
    medicines:         boolean; // medicamentos
    otherServices:     boolean; // otrosServicios
    consultations:     boolean; // consultas
    procedures:        boolean; // procedimientos
}

export interface HealthcareServices_APPDTO extends Base_APP {
    historyTypeId:  number; // tipoHistoriaId
    serviceTypeId:  number; // tipoServicioId
    serviceLevelId: number; // nivelServicioId
}

export interface HealthcareServices_APP extends Base_APP {
    id:           number; // id
    historyType:  TypeHistory_APP; // tipoHistoria
    serviceType:  NameStateEntity_APP; // tipoServicio
    serviceLevel: NameStateEntity_APP; // nivelServicio
}

export interface HealthcareServices_Detail extends Base_APP {
    historyType:  string; // tipoHistoria
    serviceType:  string; // tipoServicio
    serviceLevel: string; // nivelServicio
}

export interface HealthcareServices_PageAPP extends PageAPI<HealthcareServices_APP> {}