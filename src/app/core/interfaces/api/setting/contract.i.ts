export interface ContractDTO_API {
    numContrato: string;
    nombreContrato: string;
    fechaInicio: Date;
    fechaFin: Date;
    upc: number;
    vigente: boolean;
    cuentaCobroFactura: string;
    observacion: string;
    facturacioGrupal: boolean;
    autambulatorio: boolean;
    autHospitalizacion: boolean;
    autUrgencia: boolean;
    verificacionDerechos: boolean;
    multivitaminicos: boolean;
    soat: boolean;
    copago: boolean;
    administradoraId: number;
    planBeneficioId: number;
    manualTarifiarioId: number;
    mTarifaMedicamentoId: number;
    mTarifaMaterialesInsId: number;
    mTarifaTrasladosId: number;
    mTarifaOxigenoId: number;
    tipoAtencionId: number;
    nivelId: number;
}
