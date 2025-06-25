import { CupsDTO_API, CupsAPI } from '@interfaces/index';
import { CupsDTO_APP, CupsAPP } from '@interfaces/app';
import { NamedEntity, RipConcept, Services } from '@models/index';

export class CupDTO {
    static setProperty(dataInput: CupsDTO_APP): string {
        return new CupDTO(dataInput).data;
    }
    constructor(public dataInput: CupsDTO_APP) {}

    get data(): string {
        const data: CupsDTO_API = {
            ambitoId: this.dataInput.scopeId,
            codigo: this.dataInput.code,
            conceptoRipsId: this.dataInput.ripsConceptId,
            edadMax: this.dataInput.maxAge,
            edadMin: this.dataInput.minAge,
            estado: this.dataInput.status,
            grupoQxId: this.dataInput.surgicalGroupId,
            nivelId: this.dataInput.levelId,
            nombre: this.dataInput.name,
            parto: this.dataInput.birth,
            proceIncruento: this.dataInput.nonInvasiveProcedure,
            puntos: this.dataInput.points,
            sexoId: this.dataInput.genderId,
            tipoPartoId: this.dataInput.birthTypeId,
            tipoServiciosId: this.dataInput.serviceTypeId,
            unico: this.dataInput.unique,
            uvr: this.dataInput.uvr,
            uvt: this.dataInput.uvt,
            vigente: this.dataInput.current
        }
        return JSON.stringify(data);
    }
}

export class Cup {
    static setProperty(dataInput: CupsAPI): CupsAPP {
        return new Cup(dataInput).data;
    }

    constructor(public dataInput: CupsAPI) {}

    get data(): CupsAPP {
        return {
            id: this.dataInput.id,
            code: this.dataInput.codigo,
            name: this.dataInput.nombre,
            minAge: this.dataInput.edadMin,
            maxAge: this.dataInput.edadMax,
            unique: this.dataInput.unico,
            nonInvasiveProcedure: this.dataInput.proceIncruento,
            points: this.dataInput.puntos,
            uvr: this.dataInput.uvr,
            uvt: this.dataInput.uvt,
            birth: this.dataInput.parto,
            current: this.dataInput.vigente,
            status: this.dataInput.estado,
            gender: NamedEntity.setProperty(this.dataInput.sexo),
            level: NamedEntity.setProperty(this.dataInput.nivel),
            ripsConcept: RipConcept.setProperty(this.dataInput.conceptoRips),
            serviceType: Services.setProperty(this.dataInput.tipoServicios),
            surgicalGroup: NamedEntity.setProperty(this.dataInput.grupoQx),
            scope: NamedEntity.setProperty(this.dataInput.ambito),
            birthType: NamedEntity.setProperty(this.dataInput.tipoParto),
        };
    }
}