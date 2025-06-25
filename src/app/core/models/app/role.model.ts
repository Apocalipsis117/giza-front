import { DataRoleApi, DataRoleAPP } from "@interfaces/index";

export class ModelRole {
    static setProperty(dataInput: DataRoleApi[]): DataRoleAPP[] {
        return new ModelRole(dataInput).data;
    }
    constructor(public dataInput: DataRoleApi[]) {}

    get data(): DataRoleAPP[] {
        return this.dataInput.map(item => ({
            id: item.id,
            cargo_id: item.cargo_id,
            create: item.crear,
            delete: item.eliminar,
            edit: item.editar,
            name: item.nombre,
            read: item.leer,
            state: item.estado,
            description: item.descripcion
        }));
    }
}