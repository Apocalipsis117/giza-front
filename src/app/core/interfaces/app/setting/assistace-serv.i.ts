import { ServiceLevelAPP, TypeHistoryAPP, PaginateAPI, NamedEntityAPP } from "@interfaces/index";

export interface AssistanceServDTO_APP {
    name: string; // nombre
    opportunityDays: number; // diasOportunidad
    indicatorCode: number; // codigoIndicador
    activeInstitution: boolean; // activaInstitucion
    appointments: boolean; // citas
    receive: boolean; // recibir
    surgeryRequired: boolean; // rCirugia
    specialist: boolean; // especialista
    doctor: boolean; // medico
    historyTypeId: number; // tipoHistoria
    serviceTypeId: number; // tipoServicio
    serviceLevelId: number; // nivelServicio
}

export interface AssistanceServiceAPP {
    id: number;
    name: string;  // nombre
    opportunityDays: number;  // diasOportunidad
    indicatorCode: number;  // codigoIndicador
    isActiveInstitution: boolean; // activaInstitucion
    appointments: boolean; // citas
    receive: boolean; // recibir
    surgeryRequired: boolean; // rCirugia
    specialist: boolean; // especialista
    doctor: boolean; // medico
    creationDate: number;  // fechaCreacion
    historyType: TypeHistoryAPP; // tipoHistoria
    serviceType: NamedEntityAPP; // tipoServicio
    serviceLevel: ServiceLevelAPP; // nivelServicio
}


export interface AssistanceServiceAPP_PAGE extends PaginateAPI {
    content: AssistanceServiceAPP[]
}