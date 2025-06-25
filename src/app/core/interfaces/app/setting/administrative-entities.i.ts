import { PaginateAPI, TypeRegimeAPP } from "@interfaces/index";

export interface AdministrativeEntitiesDTO_APP {
    code: number; // codigo
    name: string; // nombre
    taxId: string; // nit
    address: string; // direccion
    filingAddress: string; // direccionRadicacion
    email: string; // correo
    electronicBillingEmail: string; // correoFactuElect
    hasInsurance: boolean; // soat
    isActive: boolean; // estado
    phone: string; // telefono
    authorizationLength: number; // longitudAutorizacion
    hasCopies: boolean; // numCopias
    ripsTaxIdVerification: boolean; // ripsVerificacionNit
    requiresAnnex2: boolean; // requiereAnexo2
    regimeId: number; // regimen
    stateId: number; // departamento
    cityId: number; // ciudad
    resolution: string; // resolucion
    otherData: string; // otros datos
}


export interface AdministrativeEntitiesAPP_PAGE extends PaginateAPI {
    content: AdministrativeEntityAPP[];
}

export interface AdministrativeEntityAPP {
    id: number;
    code: number; // codigo
    name: string; // nombre
    taxId: string; // nit
    address: string; // direccion
    filingAddress: string; // direccionRadicacion
    email: string; // correo
    electronicBillingEmail: string; // correoFactuElect
    hasInsurance: boolean; // soat
    isActive: boolean; // estado
    phone: string; // telefono
    authorizationLength: number; // longitudAutorizacion
    hasCopies: boolean; // numCopias
    ripsTaxIdVerification: boolean; // ripsVerificacionNit
    requiresAnnex2: boolean; // requiereAnexo2
    resolution: string; // resolucion
    regime: TypeRegimeAPP; // regimen
}