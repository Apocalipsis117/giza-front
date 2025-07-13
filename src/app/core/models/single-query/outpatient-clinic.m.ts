import { OutpatientClinic_API, OutpatientClinic_APP } from "@interfaces/index";

export class OutpatientClinic {
    static setProperty(input: OutpatientClinic_API) {
        return new OutpatientClinic(input).data;
    }
    constructor(public input: OutpatientClinic_API) {}

    get data(): OutpatientClinic_APP {
        const _ = this.input;
        return {
            code: _.codigo,
            id: _.id,
            name: _.nombre
        };
    }
}