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
            // reviced
            municipioId: this.input.municipalityId,
            departamentoId: this.input.departmentId,
            regimenId: this.input.regimeId,
            requiereAnexo2: this.input.requiresAnnex2,
            otrosDatos: this.input.otherData,
            plantillaResolucion1552: this.input.reportResolution256,
            reporteResolucion256: this.input.reportResolution256
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
            hasCopies: this.input.numCopias,
            id: this.input.id,
            isActive: this.input.estado,
            name: this.input.nombre,
            phone: this.input.telefono,
            nit: this.input.nit,
            soat: this.input.soat,
            requiresAnnex2: this.input.requiereAnexo2,
            resolution: this.input.resolucion,
            regime: TypeRegime.setProperty(this.input.regimen),
            otherData: this.input.otrosDatos,
            departament: Apartment.setProperty(this.input.departamento),
            municipaly: Municipaly.setProperty(this.input.municipio),
            reportResolution256: this.input.reporteResolucion256,
            templateResolution1552: this.input.plantillaResolucion1552
        }
    }

}