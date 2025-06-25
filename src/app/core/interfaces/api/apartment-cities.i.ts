export interface ApartmentCitiesAPI {
    id: number;
    codigo: string;
    nombre: string;
    ciudad: CityAPI[];
}

export interface CityAPI {
    id: number;
    codigoDepartamento: string;
    codigo: string;
    nombre: string;
    codigoCompleto: string;
}
