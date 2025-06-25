export interface InstitutionDTO_APP {
    code: number; // codigo
    roomCode: string; // codigoHabitacion
    name: string; // nombre
    address: string; // direccion
    phone: string; // telefono
    email: string; // correo
    toRefer: boolean; // aRemitir
    whoRefer: boolean; // queRemiten
    departmentId: number; // departamentoId
    cityId: number; // ciudadId
    complexityLevelId: number; // nivelComplejidadId
    legalNatureId: number; // naturalezaJuridicaId
}