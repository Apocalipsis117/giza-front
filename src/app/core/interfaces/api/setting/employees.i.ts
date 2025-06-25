export interface EmployeesDTO_APP {
    identityNumber: number; // numIdentidad
    firstName: string; // nombre
    lastName: string; // apellido
    address: string; // direccion
    phone?: string; // telefono
    email: string; // correo
    registrationNumber?: string; // nRegistro
    status: boolean; // estado
    departmentId?: number; // departamentoId
    cityId?: number; // ciudadId
    jobPositionId?: number; // cargolaboralId
    identificationTypeIpsId?: number; // tipoIdentificacionIpsId
    contractId?: number; // contratoId
}
