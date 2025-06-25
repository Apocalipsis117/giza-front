import { DataMenuAside } from '@interfaces/index';

export class ModelMenuAside {
    static setProperty(dataInput: DataMenuAside): DataMenuAside {
        return new ModelMenuAside(dataInput).data;
    }
    constructor(public dataInput: DataMenuAside) { }

    get data() {
        return {
            navegation: this.dataInput.navegation.map(x => ({
                id: x.id,
                display: x.display,
                path: x.path,
                icon: x.icon,
                name: x.name
            })),
            setting: this.dataInput.setting.map(x => ({
                id: x.id,
                display: x.display,
                path: x.path,
                icon: x.icon,
                name: x.name
            })),
        }
    }
}