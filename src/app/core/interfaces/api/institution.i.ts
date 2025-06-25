export interface InstitutionDTO_API {
    codigo: number;
    codigoHabitacion: string;
    nombre: string;
    direccion: string;
    telefono: string;
    correo: string;
    aRemitir: boolean;
    queRemiten: boolean;
    departamentoId: number;
    ciudadId: number;
    nivelComplejidadId: number;
    naturalezaJuridicaId: number;
}
