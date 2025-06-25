import { DiagnosisAPP, DiagnosisDTO_APP } from "@interfaces/app";
import { DiagnosisAPI, DiagnosisDTO_API } from "@interfaces/index";
import { NamedEntity } from "@models/index";

export class DiagnosisDTO {
    static setProperty(dataInput: DiagnosisDTO_APP): string {
        return new DiagnosisDTO(dataInput).data;
    }
    constructor(public dataInput: DiagnosisDTO_APP) {}

    get data(): string {
        const data: DiagnosisDTO_API = {
            capitulosDiagId: this.dataInput.diagnosisChapterId,
            categoriasDiagId: this.dataInput.diagnosisCategoryId,
            codigo: this.dataInput.code,
            comun: this.dataInput.common,
            edadMax: this.dataInput.maxAge,
            edadMin: this.dataInput.minAge,
            hospitalizacion: this.dataInput.hospitalization,
            nombre: this.dataInput.name,
            notificar: this.dataInput.notify,
            procedimiento: this.dataInput.procedure,
            sexoId: this.dataInput.genderId,
            subCategoriasDiagId: this.dataInput.diagnosisSubcategoryId,
            vigente: this.dataInput.active
        }
        return JSON.stringify(data);
    }
}

export class Diagnosis {
    static setProperty(dataInput: DiagnosisAPI): DiagnosisAPP {
        return new Diagnosis(dataInput).data;
    }
    constructor(public dataInput: DiagnosisAPI) {}

    get data(): DiagnosisAPP {
        return {
            active: this.dataInput.vigente,
            code: this.dataInput.codigo,
            common: this.dataInput.comun,
            diagnosisCategory: {
                diagnosisChapter: {
                    id: this.dataInput.capitulosDiag.id,
                    name: this.dataInput.capitulosDiag.nombre,
                    range: this.dataInput.capitulosDiag.rango
                },
                id: this.dataInput.categoriasDiag.id,
                name: this.dataInput.categoriasDiag.nombre,
                range: this.dataInput.categoriasDiag.rango
            },
            diagnosisChapter: {
                id: this.dataInput.capitulosDiag.id,
                name: this.dataInput.capitulosDiag.nombre,
                range: this.dataInput.capitulosDiag.rango
            },
            gender: NamedEntity.setProperty(this.dataInput.sexo),
            hospitalization: this.dataInput.hospitalizacion,
            id: this.dataInput.id,
            maxAge: this.dataInput.edadMax,
            minAge: this.dataInput.edadMin,
            name: this.dataInput.nombre,
            notify: this.dataInput.notificar,
            procedure: this.dataInput.procedimiento,
            subDiagnosisCategory: this.dataInput.subCategoriasDiag ? {
                id: this.dataInput.subCategoriasDiag.id,
                name: this.dataInput.subCategoriasDiag.nombre,
                range: this.dataInput.subCategoriasDiag.rango
            } : null
        };
    }
}