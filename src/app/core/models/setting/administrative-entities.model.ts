import { AdministrativeEntity_DTO, AdministrativeEntity_API, AdministrativeEntity_APP, AdministrativeEntity_APPDTO } from '@interfaces/index';
import { Apartment, Municipaly, TypeRegime } from '@models/index';

export class AdministrativeEntityDTO {
    static setProperty(input: AdministrativeEntity_APPDTO): string {
        return new AdministrativeEntityDTO(input).data;
    }

    constructor(public input: AdministrativeEntity_APPDTO) {}

    get data(): string {
        const _ = this.input;
        const data: AdministrativeEntity_DTO = {
            codigo: _.code,
            nombre: _.name,
            nit: _.nit,
            direccion: _.address,
            direccionRadicacion: _.filingAddress,
            correo: _.email,
            correoFactuElect: _.electronicBillingEmail,
            soat: _.soat,
            estado: _.status,
            telefono: _.phone,
            longitudAutorizacion: _.authorizationLength,
            municipioId: _.municipalityId,
            departamentoId: _.departmentId,
            requiereAnexo2: _.requiresAnnex2,
            otrosDatos: _.otherData,
            plantillaResolucion1552: _.reportResolution256,
            reporteResolucion256: _.reportResolution256,
            regimenId: _.regimeId
        };
        return JSON.stringify(data);
    }
}

export class AdministrativeEntity {
    static setProperty(input: AdministrativeEntity_API): AdministrativeEntity_APP {
        return new AdministrativeEntity(input).data;
    }
    constructor(public input: AdministrativeEntity_API) {}

    get data(): AdministrativeEntity_APP {
        const _ = this.input;
        return {
            address: _.direccion,
            authorizationLength: _.longitudAutorizacion,
            code: _.codigo,
            electronicBillingEmail: _.correoFactuElect,
            email: _.correo,
            filingAddress: _.direccionRadicacion,
            id: _.id,
            name: _.nombre,
            phone: _.telefono,
            nit: _.nit,
            soat: _.soat,
            requiresAnnex2: _.requiereAnexo2,
            regime: TypeRegime.setProperty(_.regimen),
            otherData: _.otrosDatos,
            department: Apartment.setProperty(_.departamento),
            municipality: Municipaly.setProperty(_.municipio),
            reportResolution256: _.reporteResolucion256,
            templateResolution1552: _.plantillaResolucion1552,
            status: _.estado
        }
    }

}