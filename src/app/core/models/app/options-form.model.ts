import { OptionsForm } from "@interfaces/index";

export class OptionsControl {
    static setProperty(value: number, name: string, data: any | null = null): OptionsForm {
        return new OptionsControl(value, name, data).option;
    }
    constructor(
        private value: number,
        private name: string,
        private data: any | null
    ) {}

    get option(): OptionsForm {
        return {
            value: this.value,
            name: this.name,
            data: this.data
        }
    }
}