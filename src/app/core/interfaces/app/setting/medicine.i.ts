import { CostCenterAPP, NamedEntityAPP, PaginateAPI, ServicesAPP } from "@interfaces/index";

export interface MedicineDTO_APP {
    code: string; // codigo
    name: string; // nombre
    atc: string; // atc
    cum: string; // cum
    consCum: string; // consCum
    cumName: string; // nombreCum
    referenceUnit: string; // unidadReferencia __ok
    consecutive: string; // consecutivo
    otherName: string; // otroNombre
    adverseEffect: string; // efectoAdverso
    contraindications: string; // contraindicaciones
    interactionIncompatibility: string; // interaccionIncompatibilidad
    liquid: boolean; // liquido
    status: boolean; // estado
    medicationTypeId: number; // tipoMedicamentoId
    measurementUnitId: number; // unidadMedidaId
    concentrationId: number; // concentracionId
    pharmaceuticalFormId: number; // formaFarmaceuticaId
    costCenterId: number; // centroCostoId
    serviceTypeId: number; // tipoServiciosId
}

export interface MedicineAPP {
    id: number; // id
    code: string; // codigo
    name: string; // nombre
    atc: string; // atc
    cum: string; // cum
    cumCons: string; // consCum
    cumName: string; // nombreCum
    referenceUnit: string; // unidadReferencia
    otherName: null | string; // otroNombre
    adverseEffect: null | string; // efectoAdverso
    contraindications: null | string; // contraindicaciones
    interactionIncompatibility: null; // interaccionIncompatibilidad
    isLiquid: boolean; // liquido
    isActive: boolean; // estado
    medicineType: NamedEntityAPP | null; // tipoMedicamento
    measurementUnit: NamedEntityAPP | null; // unidadMedida
    concentration: null | NamedEntityAPP; // concentracion
    pharmaceuticalForm: NamedEntityAPP; // formaFarmaceutica
    costCenter: CostCenterAPP; // centroCosto
    serviceTypes: ServicesAPP; // tipoServicios
}

export interface MedicineAPP_PAGE extends PaginateAPI {
    content: MedicineAPP[]
}


