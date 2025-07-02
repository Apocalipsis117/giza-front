import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { MedicineRateManual_API, MedicineRateManual_APP, MedicineRateManual_APPDTO, MedicineRateManual_DTO, NameIdEntity_API, NameIdEntity_APP, Service_API, Service_APP } from "@interfaces/index";
import { CostCenter_API, CostCenter_APP } from "./cost-center.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
interface Base_API {
    codigo:                      string;
    nombre:                      string;
    atc:                         string;
    cum:                         number;
    consCum:                     string;
    nombreCum:                   string;
    unidadReferencia:            string;
    otroNombre:                  string;
    efectoAdverso:               string;
    contraindicaciones:          string;
    interaccionIncompatibilidad: string;
    liquido:                     boolean;
    estado:                      boolean;
}


export interface Medicine_API extends Base_API {
    id:                          number;
    tipoMedicamento:             NameIdEntity_API;
    unidadMedida:                NameIdEntity_API;
    concentracion:               NameIdEntity_API;
    formaFarmaceutica:           NameIdEntity_API;
    centroCosto:                 CostCenter_API;
    tipoServicios:               Service_API;
    medicamentoManualTarifaMeds: MedicineRateManual_API[];
    viaAdministracion:           NameIdEntity_API[];
    grupoMedicamentos:           NameIdEntity_API[];
}

export interface Medicine_DTO extends Base_API {
    tipoMedicamentoId:           number;
    unidadMedidaId:              number;
    concentracionId:             number;
    formaFarmaceuticaId:         number;
    centroCostoId:               number;
    tipoServiciosId:             number;
    medicamentoManualTarifaMed:  MedicineRateManual_DTO[];
    viaAdministracionIds:        number[];
    grupoMedicamentoIds:         number[];
}

export interface MedicineTariff_DTO {
    maunualTarifaMedicamentoId: number;
    valor:                      number;
}

export interface Medicine_PageResponse extends ResponseAPI<PageAPI<Medicine_API>> {}
export interface Medicine_PageAPI extends PageAPI<Medicine_API> {}
export interface Medicine_ListResponse extends ResponseAPI<Medicine_API[]> {}
export interface Medicine_Response extends ResponseAPI<Medicine_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */

interface Base_APP {
    code:                       string; // codigo
    name:                       string; // nombre
    atc:                        string; // atc
    cum:                        number; // cum
    cumConsecutive:             string; // consCum
    cumName:                    string; // nombreCum
    referenceUnit:              string; // unidadReferencia
    otherName:                  string; // otroNombre
    adverseEffect:              string; // efectoAdverso
    contraindications:          string; // contraindicaciones
    interactionIncompatibility: string; // interaccionIncompatibilidad
    liquid:                     boolean; // liquido
    status:                     boolean; // estado
}

export interface Medicine_APPDTO extends Base_APP {
    medicineTypeId:             number; // tipoMedicamentoId
    unitOfMeasureId:            number; // unidadMedidaId
    concentrationId:            number; // concentracionId
    pharmaceuticalFormId:       number; // formaFarmaceuticaId
    costCenterId:               number; // centroCostoId
    serviceTypeId:              number; // tipoServiciosId
    medicineManualTariffMed:    MedicineRateManual_APPDTO[]; // medicamentoManualTarifaMed
    administrationRouteIds:     number[]; // viaAdministracionIds
    medicineGroupIds:           number[]; // grupoMedicamentoIds
}

export interface MedicineTariff_APPDTO {
    maunualTarifaMedicamentoId: number;
    value:                      number;
}

export interface Medicine_APP extends Base_APP {
    id:                         number; // id
    medicineType:               NameIdEntity_APP; // tipoMedicamento
    unitOfMeasure:              NameIdEntity_APP; // unidadMedida
    concentration:              NameIdEntity_APP; // concentracion
    pharmaceuticalForm:         NameIdEntity_APP; // formaFarmaceutica
    costCenter:                 CostCenter_APP; // centroCosto
    serviceType:                Service_APP; // tipoServicios
    medicineManualTariffMeds:   MedicineRateManual_APP[]; // medicamentoManualTarifaMeds
    administrationRoutes:       NameIdEntity_APP[]; // viaAdministracion
    medicineGroups:             NameIdEntity_APP[]; // grupoMedicamentos
}

export interface Medicine_PageResponseAPP extends ResponseAPI<PageAPI<Medicine_APP>> {}
export interface Medicine_PageAPP extends PageAPI<Medicine_APP> {}
export interface Medicine_ListResponseAPP extends ResponseAPI<Medicine_APP[]> {}
export interface Medicine_ResponseAPP extends ResponseAPI<Medicine_APP> {}