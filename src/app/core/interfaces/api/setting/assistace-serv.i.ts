import { NamedEntityAPI, PaginateAPI } from "@interfaces/index";

export interface AssistanceServ_DTO {
    nombre: string;
    diasOportunidad: number;
    codigoIndicador: number;
    activaInstitucion: boolean;
    citas: boolean;
    recibir: boolean;
    rCirugia: boolean;
    especialista: boolean;
    medico: boolean;
    tipoHistoriaId: number;
    tipoServicioId: number;
    nivelServicioId: number;
}

export interface AssistanceServiceAPI {
    id: number;
    nombre: string;
    diasOportunidad: number;
    codigoIndicador: number;
    activaInstitucion: boolean;
    citas: boolean;
    recibir: boolean;
    rCirugia: boolean;
    especialista: boolean;
    medico: boolean;
    fechaCreacion: number;
    tipoHistoria: any; // @TODO
    tipoServicio: NamedEntityAPI;
    nivelServicio: NamedEntityAPI;
}

export interface AssistanceServiceAPI_PAGE extends PaginateAPI {
    content: AssistanceServiceAPI[]
}