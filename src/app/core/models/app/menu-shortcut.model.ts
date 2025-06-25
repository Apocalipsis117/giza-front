import { DataShortcutMenu, MenuShortcutShortcutMenu } from "@interfaces/index";

export class ModelMenuShortcut {
    static setProperty(dataInput: DataShortcutMenu): MenuShortcutShortcutMenu[] {
        return new ModelMenuShortcut(dataInput).data;
    }
    constructor(public dataInput: DataShortcutMenu) {}

    get data() {
        return this.dataInput.menuShortcut.map(item => ({ ...item }));
    }
}