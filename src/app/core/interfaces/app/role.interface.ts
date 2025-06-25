export interface RoleAPP {
    message: string;
    role: DataRoleAPP;
}

export interface DataRoleAPP {
    id: number;
    cargo_id: number;
    description: string | null;
    name: string;
    create: boolean;
    edit: boolean;
    read: boolean;
    delete: boolean;
    state: boolean;
}