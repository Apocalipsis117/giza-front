import { FormControlOption } from "@interfaces/index";

export class OptionsControl {
    static setProperty(value: number | string, name: string, data: any | null = null): FormControlOption {
        return new OptionsControl(value, name, data).option;
    }
    constructor(
        private value: number | string,
        private name: string,
        private data: any | null
    ) {}

    get option(): FormControlOption {
        return {
            value: this.value,
            name: this.name,
            data: this.data
        }
    }
}