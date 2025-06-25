import { OptionsForm } from "./form.interface";

export interface ApartmentCitiesAPP {
    id: number; // id
    name: string; // nombre
    city: CityAPP[]; // ciudad
}

export interface CityAPP {
    id: number; // id
    name: string; // nombre
}

export interface CitiesOptionForm extends OptionsForm {
    cities: OptionsForm[];
}