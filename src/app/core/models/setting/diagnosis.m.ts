import { Diagnosis_API, Diagnosis_APP, Diagnosis_APPDTO, Diagnosis_DTO, SDiag_API, SDiag_APP } from "@interfaces/index";
import { Gender } from "@models/index";

export class DiagnosisDTO {
    static setProperty(input: Diagnosis_APPDTO) {
        return new DiagnosisDTO(input).data;
    }
    constructor(public input: Diagnosis_APPDTO) {}

    get data() {
        const _ = this.input;
        const data: Diagnosis_DTO = {
            capitulosDiagId: _.chapterId,
            categoriasDiagId: _.categoryId,
            codigo: _.code,
            comun: _.common,
            edadMax: _.maxAge,
            edadMin: _.minAge,
            hospitalizacion: _.hospitalization,
            nombre: _.name,
            notificar: _.notify,
            procedimiento: _.procedure,
            sexoId: _.genderId,
            subCategoriasDiagId: _.subCategoryId,
            vigente: _.active
        }
        return JSON.stringify(data);
    }
}

export class Diagnosis {
    static setProperty(input: Diagnosis_API) {
        return new Diagnosis(input).data;
    }
    constructor(public input: Diagnosis_API) {}

    get data(): Diagnosis_APP {
        const _ = this.input;
        return {
            active: _.vigente,
            category: SDiag.setProperty(_.categoriasDiag),
            chapter: SDiag.setProperty(_.capitulosDiag),
            code: _.codigo,
            common: _.comun,
            gender: Gender.setProperty(_.sexo),
            hospitalization: _.hospitalizacion,
            id: _.id,
            maxAge: _.edadMax,
            minAge: _.edadMin,
            name: _.nombre,
            notify: _.notificar,
            procedure: _.procedimiento,
            subCategory: SDiag.setProperty(_.subCategoriasDiag)
        };
    }
}

export class SDiag {
    static setProperty(input: SDiag_API): SDiag_APP {
        return new SDiag(input).data;
    }
    constructor(public input: SDiag_API) {}

    get data(): SDiag_APP {
        const _ = this.input;
        return {
            id: _.id,
            name: _.nombre,
            range: _.rango,
            chapter: _.capitulosDiag ? SDiag.setProperty(_.capitulosDiag) : null,
            category: _.categoriasDiag ? SDiag.setProperty(_.categoriasDiag) : null
        };
    }
}