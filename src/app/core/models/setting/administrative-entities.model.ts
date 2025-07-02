import { AdministrativeEntity_DTO, AdministrativeEntity_API, AdministrativeEntity_APP, AdministrativeEntity_APPDTO } from '@interfaces/index';
import { Apartment, Municipaly, TypeRegime } from '@models/index';

export class AdministrativeEntityDTO {
    static setProperty(input: AdministrativeEntity_APPDTO): string {
        return new AdministrativeEntityDTO(input).data;
    }

    constructor(public input: AdministrativeEntity_APPDTO) {}

    get data(): string {
        const data: AdministrativeEntity_DTO = {
            codigo: this.input.code,
            nombre: this.input.name,
            nit: this.input.nit,
            direccion: this.input.address,
            direccionRadicacion: this.input.filingAddress,
            correo: this.input.email,
            correoFactuElect: this.input.electronicBillingEmail,
            soat: this.input.soat,
            estado: this.input.status,
            telefono: this.input.phone,
            longitudAutorizacion: this.input.authorizationLength,
            municipioId: this.input.municipalityId,
            departamentoId: this.input.departmentId,
            requiereAnexo2: this.input.requiresAnnex2,
            otrosDatos: this.input.otherData,
            plantillaResolucion1552: this.input.reportResolution256,
            reporteResolucion256: this.input.reportResolution256,
            regimenId: this.input.regimeId
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
        return {
            address: this.input.direccion,
            authorizationLength: this.input.longitudAutorizacion,
            code: this.input.codigo,
            electronicBillingEmail: this.input.correoFactuElect,
            email: this.input.correo,
            filingAddress: this.input.direccionRadicacion,
            id: this.input.id,
            name: this.input.nombre,
            phone: this.input.telefono,
            nit: this.input.nit,
            soat: this.input.soat,
            requiresAnnex2: this.input.requiereAnexo2,
            regime: TypeRegime.setProperty(this.input.regimen),
            otherData: this.input.otrosDatos,
            department: Apartment.setProperty(this.input.departamento),
            municipality: Municipaly.setProperty(this.input.municipio),
            reportResolution256: this.input.reporteResolucion256,
            templateResolution1552: this.input.plantillaResolucion1552,
            status: this.input.estado
        }
    }

}