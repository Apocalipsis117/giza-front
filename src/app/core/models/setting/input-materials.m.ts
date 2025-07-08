import { InputMaterials_API, InputMaterials_APP, InputMaterials_APPDTO, InputMaterials_DTO } from "@interfaces/index";
import { ClassificationMaterials, NameIdEntity, NameStateEntity } from "@models/index";

export class InputMaterialsDTO {
    static setProperty(input: InputMaterials_APPDTO) {
        return new InputMaterialsDTO(input).data;
    }
    constructor(public input: InputMaterials_APPDTO) {}

    get data() {
        const _ = this.input;
        const data: InputMaterials_DTO = {
            clasificacionMatId: _.materialClassificationId,
            conceptoRipsId: _.ripsConceptId,
            estado: _.status,
            facturable: _.billable,
            manualTarifaMaterialesInsIds: _.manualInputMaterialsTariffIds,
            nombre: _.name
        }
        return JSON.stringify(data);
    }
}

export class InputMaterials {
    static setProperty(input: InputMaterials_API) {
        return new InputMaterials(input).data;
    }
    constructor(public input: InputMaterials_API) {}

    get data(): InputMaterials_APP {
        const _ = this.input;
        return {
            billable: _.facturable,
            code: _.codigo,
            id: _.id,
            manualInputMaterialsTariffs: this.manualInputMaterialsTariffs(),
            materialClassification: ClassificationMaterials.setProperty(_.clasificacionMat),
            name: _.nombre,
            ripsConcept: NameIdEntity.setProperty(_.conceptoRips),
            status: _.estado
        };
    }

    private manualInputMaterialsTariffs() {
        return this.input.manualTarifaMaterialesIns.map(x => NameStateEntity.setProperty(x))
    }
}