import { IpsDTO_API, IpsDTO_APP, DatosLegalesIpsDTO_API } from "@interfaces/index";

export class IpsDTO {
    static setProperty(dataInput: IpsDTO_APP): string {
        return new IpsDTO(dataInput).data;
    }
    constructor(public dataInput: IpsDTO_APP) {}

    get data(): string {
        const data: IpsDTO_API = {
            ips: {
                codigo: this.ips.code,
                correo: this.ips.email,
                departamentoId: this.ips.departmentId,
                direccion: this.address,
                digitoVerificacion: this.ips.verificationDigit,
                indicativo: this.ips.indicative,
                logoIps: this.ips.ipsLogo,
                nivelId: this.ips.levelId,
                nombre: this.ips.name,
                numIdentificacion: this.ips.identificationNumber,
                telefono: this.ips.phone,
                tipoIdentificacionIpsId: this.ips.ipsIdentificationTypeId,
                ciudadId: this.ips.cityId
            },
            datosLegalesIps: this.legalData,
            pFacturacionIps: {
                numResolucionDian: this.parametrosIps.resolutionNumber,
                fechaInicioDian: this.parametrosIps.startDate,
                fechaFinDian: this.parametrosIps.endDate,
                fechaResolucion: this.parametrosIps.resolutionDate,
                vigenciaResolucion: this.parametrosIps.resolutionValidity,
                prefijo: this.parametrosIps.prefix,
                numFactura: this.parametrosIps.invoiceNumber,
                numCuentaCobro: this.parametrosIps.collectionAccountNumber,
                delegadoSoat: this.parametrosIps.soatDelegate,
                responsableRips: this.parametrosIps.ripsResponsible,
                recibeRemisiones: this.parametrosIps.receivesRemissions,
                imprimeHojasCitas: this.parametrosIps.printsAppointmentSheets,
                manejoHistoriaClinica: this.parametrosIps.handlesClinicalHistory,
                vigenciaFormula: this.parametrosIps.formulaValidity,
                numDiasEstancias: this.parametrosIps.numberOfDaysStays,
                pieCuentaCobro: this.parametrosIps.collectionAccountFooter
            }
        }
        return JSON.stringify(data);
    }

    get ips() {
        return this.dataInput.ips;
    }

    get parametrosIps() {
        return this.dataInput.pFacturacionIps;
    }

    get legalData(): DatosLegalesIpsDTO_API[] {
        return this.dataInput.datosLegalesIps.map(x => ({
            nombre: x.name,
            imgFirma: x.signatureImg,
            estado: x.status,
            tipoRepresentanteIpsId: x.ipsRepresentativeType
        }));
    }

    get address(): string {
        const neighborhood = this.dataInput.ips.neighborhood ? ` - ${this.dataInput.ips.neighborhood}` : '';
        return this.ips.address + neighborhood;
    }
}