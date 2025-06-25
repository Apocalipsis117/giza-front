import { AdministrativeEntitiesDTO, AdministrativeEntityAPI } from '@interfaces/index';
import { AdministrativeEntityAPP, AdministrativeEntitiesDTO_APP } from '@interfaces/app';
import { TypeRegime } from '@models/index';

export class AdministrativeEntityDTO {
    static setProperty(dataInput: AdministrativeEntitiesDTO_APP): string {
        return new AdministrativeEntityDTO(dataInput).data;
    }

    constructor(public dataInput: AdministrativeEntitiesDTO_APP) {}

    get data(): string {
        const data: AdministrativeEntitiesDTO = {
            codigo: this.dataInput.code,
            nombre: this.dataInput.name,
            nit: this.dataInput.taxId,
            direccion: this.dataInput.address,
            direccionRadicacion: this.dataInput.filingAddress,
            correo: this.dataInput.email,
            correoFactuElect: this.dataInput.electronicBillingEmail,
            soat: this.dataInput.hasInsurance,
            estado: this.dataInput.isActive,
            telefono: this.dataInput.phone,
            longitudAutorizacion: this.dataInput.authorizationLength,
            numCopias: this.dataInput.hasCopies,
            // reviced
            ciudadId: this.dataInput.cityId,
            departamentoId: this.dataInput.stateId,
            regimenId: this.dataInput.regimeId,
            requiereAnexo2: this.dataInput.requiresAnnex2,
            resolucion: this.dataInput.resolution,
            ripsVerificacionNit: this.dataInput.ripsTaxIdVerification,
            otrosDatos: this.dataInput.otherData
        };
        return JSON.stringify(data);
    }
}

export class AdministrativeEntities {
    static setProperty(dataInput: AdministrativeEntityAPI): AdministrativeEntityAPP {
        return new AdministrativeEntities(dataInput).data;
    }
    constructor(public dataInput: AdministrativeEntityAPI) {}

    get data(): AdministrativeEntityAPP {
        return {
            address: this.dataInput.direccion,
            authorizationLength: this.dataInput.longitudAutorizacion,
            code: this.dataInput.codigo,
            electronicBillingEmail: this.dataInput.correoFactuElect,
            email: this.dataInput.correo,
            filingAddress: this.dataInput.direccionRadicacion,
            hasCopies: this.dataInput.numCopias,
            id: this.dataInput.id,
            isActive: this.dataInput.estado,
            name: this.dataInput.nombre,
            phone: this.dataInput.telefono,
            taxId: this.dataInput.nit,
            hasInsurance: this.dataInput.soat,
            requiresAnnex2: this.dataInput.requiereAnexo2,
            resolution: this.dataInput.resolucion,
            ripsTaxIdVerification: this.dataInput.ripsVerificacionNit,
            regime: TypeRegime.setProperty(this.dataInput.regimen)
        }
    }

}