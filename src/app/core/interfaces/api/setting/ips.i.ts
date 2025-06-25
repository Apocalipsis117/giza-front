import { DatosLegalesIpsDTO_API } from "@interfaces/index";

/**
 * Ips
 * @method: post
 */
export interface IpsDTO_API {
    ips: BasicDataIpsDTO_API;
    datosLegalesIps: DatosLegalesIpsDTO_API[];
    pFacturacionIps: BillingIpsDTO_API;
}

export interface BasicDataIpsDTO_API {
    codigo: string;
    nombre: string;
    numIdentificacion: number;
    digitoVerificacion: number;
    indicativo: number;
    telefono: number;
    direccion: string;
    correo: string;
    logoIps: string;
    nivelId: number;
    tipoIdentificacionIpsId: number;
    departamentoId: number;
    ciudadId: number;
}

export interface BillingIpsDTO_API {
    numResolucionDian: number;
    fechaInicioDian: Date;
    fechaFinDian: Date;
    fechaResolucion: Date;
    vigenciaResolucion: Date;
    prefijo: string;
    numFactura: number;
    numCuentaCobro: string;
    delegadoSoat: string;
    responsableRips: string;
    recibeRemisiones: boolean;
    imprimeHojasCitas: boolean;
    manejoHistoriaClinica: boolean;
    vigenciaFormula: number;
    numDiasEstancias: number;
    pieCuentaCobro: string;
}