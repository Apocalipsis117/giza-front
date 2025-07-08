import { ClassificationMaterials_API, ClassificationMaterials_APP } from "@interfaces/single-query/classification-materials.i";

export class ClassificationMaterials {
    static setProperty(input: ClassificationMaterials_API) {
        return new ClassificationMaterials(input).data;
    }
    constructor(public input: ClassificationMaterials_API) {}

    get data(): ClassificationMaterials_APP {
        const _ = this.input;
        return {
            classification: _.clasifiacion,
            id: _.id,
            name: _.nombre
        };
    }
}