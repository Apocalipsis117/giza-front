export interface EmployeesDTO_API {
    numIdentidad: number;
    nombre: string;
    apellido: string;
    direccion: string;
    telefono?: string;
    correo: string;
    nRegistro?: string;
    estado: boolean;
    departamentoId?: number;
    ciudadId?: number;
    cargolaboralId?: number;
    tipoIdentificacionIpsId?: number;
    contratoId?: number;
}
