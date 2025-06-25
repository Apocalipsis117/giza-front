import { CargoAPI, CargoAPP } from "@interfaces/index";

export class _ModelCargo {
    static setProperty(dataInput: CargoAPI[]): CargoAPP[] {
        return new _ModelCargo(dataInput).data;
    }
    constructor(public dataInput: CargoAPI[]) {}

    get data() {
        return this.dataInput.map(item => ({
            id: item.id,
            name: item.name
        }));
    }
}