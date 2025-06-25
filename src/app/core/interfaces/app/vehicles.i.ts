import { ActivityVehicleAPP, TypeVehicleAPP } from "@interfaces/index";

export interface VehiclesTDO_APP {
    brand: string; // marca
    model: string; // modelo
    licensePlate: string; // placa
    description: string; // descripcion
    status: boolean; // estado -> status
    activityId: number; // actividad
    vehicleTypeId: number; // tipoVehiculo
}

export interface VehicleAPP {
    id: number; // id
    brand: string; // Marca del vehículo
    model: string; // Modelo del vehículo
    licensePlate: string; // Placa del vehículo
    description: string; // Descripción del vehículo
    status: boolean; // Estado del vehículo (activo/inactivo)
    activity: ActivityVehicleAPP; // Actividad asociada al vehículo
    vehicleType: TypeVehicleAPP; // Tipo de vehículo
}
