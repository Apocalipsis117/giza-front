import { LegalDataIpsAPP } from '@interfaces/app';

export interface IpsDTO_APP {
    ips: BasicDataIpsDTO_APP;
    datosLegalesIps: LegalDataIpsAPP[];
    pFacturacionIps: BillingIpsDTO_APP;
}

export interface BillingIpsDTO_APP {
    resolutionNumber: number; // numResolucionDian
    startDate: Date; // fechaInicioDian
    endDate: Date; // fechaFinDian
    resolutionDate: Date; // fechaResolucion
    resolutionValidity: Date; // vigenciaResolucion
    prefix: string; // prefijo
    invoiceNumber: number; // numFactura
    collectionAccountNumber: string; // numCuentaCobro
    soatDelegate: string; // delegadoSoat
    ripsResponsible: string; // responsableRips
    receivesRemissions: boolean; // recibeRemisiones
    printsAppointmentSheets: boolean; // imprimeHojasCitas
    handlesClinicalHistory: boolean; // manejoHistoriaClinica
    formulaValidity: number; // vigenciaFormula
    numberOfDaysStays: number; // numDiasEstancias
    collectionAccountFooter: string; // pieCuentaCobro
}

export interface BasicDataIpsDTO_APP {
    code: string; // codigo
    name: string; // nombre
    identificationNumber: number; // numIdentificacion
    verificationDigit: number; // digitoVerificacion
    indicative: number; // indicativo
    phone: number; // telefono
    address: string; // direccion
    email: string; // correo
    ipsLogo: string; // logoIps
    levelId: number; // nivelId
    ipsIdentificationTypeId: number; // tipoIdentificacionIpsId
    departmentId: number; // departamentoId
    cityId: number; // ciudadId
    neighborhood: string; // barrio (not in API)
}

