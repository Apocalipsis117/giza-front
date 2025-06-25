import { CostCenterAPI, NamedEntityAPI, PaginateAPI, ServicesAPI } from "@interfaces/index";

export interface MedicineDTO_API {
    codigo: string;
    nombre: string;
    atc: string;
    cum: string;
    consCum: string;
    nombreCum: string;
    unidadReferencia: string;
    consecutivo: string;
    otroNombre: string;
    efectoAdverso: string;
    contraindicaciones: string;
    interaccionIncompatibilidad: string;
    liquido: boolean;
    estado: boolean;
    tipoMedicamentoId: number;
    unidadMedidaId: number;
    concentracionId: number;
    formaFarmaceuticaId: number;
    centroCostoId: number;
    tipoServiciosId: number;
}

export interface MedicineAPI {
    id: number;
    codigo: string;
    nombre: string;
    atc: string;
    cum: string;
    consCum: string;
    nombreCum: string;
    unidadReferencia: string;
    otroNombre: null;
    efectoAdverso: null;
    contraindicaciones: null;
    interaccionIncompatibilidad: null;
    liquido: boolean;
    estado: boolean;
    tipoMedicamento: NamedEntityAPI;
    unidadMedida: null;
    concentracion: null | NamedEntityAPI;
    formaFarmaceutica: NamedEntityAPI;
    centroCosto: CostCenterAPI;
    tipoServicios: ServicesAPI;
}


export interface MedicineAPI_PAGE extends PaginateAPI {
    content: MedicineAPI[]
}
