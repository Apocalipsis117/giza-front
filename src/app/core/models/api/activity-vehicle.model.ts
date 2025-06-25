import { ActivityVehicleAPI, ActivityVehicleAPP } from "@interfaces/index";

export class ActivityVehicle {
    static setProperty(dataInput: ActivityVehicleAPI): ActivityVehicleAPP {
        return new ActivityVehicle(dataInput).data;
    }
    constructor(public dataInput: ActivityVehicleAPI) {}

    get data(): ActivityVehicleAPP {
        return {
            id: this.dataInput.id,
            name: this.dataInput.nombre,
            description: this.dataInput.descripcion,
            optionForm: {
                name: this.dataInput.nombre,
                value: this.dataInput.id
            }
        }
    }
}