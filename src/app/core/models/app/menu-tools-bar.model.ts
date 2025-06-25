import { BarActionToolBarActions, DataToolBarActions } from "@interfaces/index";

export class ModelMenutoolbar {
    static setProperty(dataInput: DataToolBarActions): BarActionToolBarActions[] {
        return new ModelMenutoolbar(dataInput).data;
    }
    constructor(public dataInput: DataToolBarActions) { }

    get data() {
        return this.dataInput.barActions.map(item => ({
            ...item
        }))
    }
}