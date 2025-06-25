export interface RoleAPI {
    message: string;
    role: DataRoleApi[];
}

export interface DataRoleApi {
    id: number;
    cargo_id: number;
    nombre: string;
    descripcion: string | null;
    crear: boolean;
    editar: boolean;
    leer: boolean;
    eliminar: boolean;
    estado: boolean;
    updated_at: Date;
    created_at: Date;
}