export interface ContractDTO_APP {
    contractNumber: string; // numContrato ✅
    contractName: string; // nombreContrato ✅
    startDate: Date; // fechaInicio ✅
    endDate: Date; // fechaFin ✅
    upc: number; // ups ✅
    isActive: boolean; // vigente ✅
    billingInvoice: string; // cuentaCobroFactura ✅
    observation: string; // observacion ✅
    groupBilling: boolean; // facturacioGrupal ✅
    outpatientAuthorization: boolean; // autambulatorio ✅
    hospitalizationAuthorization: boolean; // autHospitalizacion ✅
    emergencyAuthorization: boolean; // autUrgencia ✅
    rightsVerification: boolean; // verificacionDerechos ✅
    multivitamins: boolean; // multivitaminicos ✅
    soatCoverage: boolean; // soat ✅
    copayment: boolean; // copago ✅
    administratorId: number; // administradoraId
    benefitPlanId: number; // planBeneficioIdo ✅
    tariffManualId: number; // manualTarifiarioId
    medicationTariffId: number; // mTarifaMedicamentoId
    materialsTariffId: number; // mTarifaMaterialesInsId
    transfersTariffId: number; // mTarifaTrasladosId
    oxygenTariffId: number; // mTarifaOxigenoId
    careTypeId: number; // tipoAtencionId ✅
    levelId: number; // nivelId
}
