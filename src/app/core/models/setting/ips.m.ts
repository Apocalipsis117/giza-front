import { Ips_API, Ips_APP, Ips_APPDTO, Ips_DTO } from "@interfaces/index";
import { BillingParameters, BillingParametersDTO } from "./billing-parameters.m";
import { LegalInformation, LegalInformationDTO } from "./legal-information.m";
import { Apartment, Municipaly } from "./apartment-cities.model";
import { NameIdEntity } from "@models/index";

export class IpsDTO {
    static setProperty(input: Ips_APPDTO) {
        return new IpsDTO(input).data;
    }
    constructor(public input: Ips_APPDTO) {}

    get data() {
        const ips = this.input.ips;
        const _ = this.input;
        const data: Ips_DTO = {
            ips: {
                codigo: ips.code,
                correo: ips.email,
                departamentoId: ips.departmentId,
                digitoVerificacion: ips.verificationDigit,
                direccion: ips.address,
                logoIps: ips.ipsLogo,
                municipioId: ips.municipalityId,
                nit: ips.taxId,
                nivelId: ips.levelId,
                nombre: ips.name,
                numIdentificacion: ips.identificationNumber,
                prefijo: ips.prefix,
                telefono: ips.phone,
                telefonoSiau: ips.siauPhone,
                tipoIdentificacionIpsId: ips.healthcareFacilityIdTypeId
            },
            parametrosFacturacionIps: BillingParametersDTO.setProperty(_.billingParameters, false),
            datosLegalesIps: this.datosLegalesIps
        }
        return JSON.stringify(data);
    }
    private get datosLegalesIps() {
        return this.input.legalInformation.map(x => LegalInformationDTO.setProperty(x, false))
    }
}

export class Ips {
    static setProperty(input: Ips_API) {
        return new Ips(input).data;
    }
    constructor(public input: Ips_API) {}

    get data(): Ips_APP {
        const _ = this.input;
        return {
            uuid: _.uuid,
            address: _.correo,
            billingParameters: BillingParameters.setProperty(_.parametrosFacturacionIps),
            code: _.codigo,
            department: Apartment.setProperty(_.departamento),
            email: _.correo,
            identificationNumber: _.numIdentificacion,
            level: NameIdEntity.setProperty(_.nivel),
            ipsLogo: _.logoIps,
            municipality: Municipaly.setProperty(_.municipio),
            verificationDigit: _.digitoVerificacion,
            prefix: _.prefijo,
            name: _.nombre,
            phone: _.telefono,
            siauPhone: _.telefonoSiau,
            legalInformation: _.datosLegalesIps.map(x => LegalInformation.setProperty(x)),
            taxId: _.nit,
            healthcareFacilityIdType: NameIdEntity.setProperty(_.tipoIdentificacionIps)
        };
    }
}