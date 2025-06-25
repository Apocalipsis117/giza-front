import { transform } from '@helpers/index';
import { ApartmentCitiesAPI, ApartmentCitiesAPP, CitiesOptionForm, CityAPI, CityAPP, OptionsForm } from '@interfaces/index';

export class ApartmentCitiesOptions {
    static setProperty(dataInput: ApartmentCitiesAPI): CitiesOptionForm {
        return new ApartmentCitiesOptions(dataInput).data;
    }
    constructor(public dataInput: ApartmentCitiesAPI) {}

    queso$ = 1223;

    get data(): CitiesOptionForm {
        return {
            value: this.dataInput.id,
            name: transform.capitalizeFirstLetter(this.dataInput.nombre),
            cities: this.cities(this.dataInput.ciudad)
        }
    }

    private cities(item: CityAPI[]): OptionsForm[] {
        return item.map(city => ({
            value: city.id,
            name: transform.capitalizeFirstLetter(city.nombre)
        }))
    }
}


export class ApartmentCities {
    static setProperty(dataInput: ApartmentCitiesAPI): ApartmentCitiesAPP {
        return new ApartmentCities(dataInput).data;
    }
    constructor(public dataInput: ApartmentCitiesAPI) {}

    get data(): ApartmentCitiesAPP {
        return {
            id: this.dataInput.id,
            name: transform.capitalizeFirstLetter(this.dataInput.nombre),
            city: this.city(this.dataInput.ciudad)
        }
    }

    private city(item: CityAPI[]): CityAPP[] {
        return item.map(city => ({
            id: city.id,
            name: transform.capitalizeFirstLetter(city.nombre)
        }))
    }
}