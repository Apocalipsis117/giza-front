import { Activity_API, Activity_APP } from "@interfaces/index";

export class Activity {
    static setProperty(input: Activity_API) {
        return new Activity(input).data;
    }
    constructor(public input: Activity_API) {}

    get data(): Activity_APP {
        return {
            description: this.input.descripcion,
            id: this.input.id,
            name: this.input.nombre
        };
    }
}