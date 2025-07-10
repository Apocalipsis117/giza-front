import { Neighborhood_API, Neighborhood_APP, Neighborhood_APPDTO, Neighborhood_DTO } from "@interfaces/index";
import { Apartment, Municipaly, TypeZone } from "@models/index";

export class NeighborhoodDTO {
    static setProperty(input: Neighborhood_APPDTO) {
        return new NeighborhoodDTO(input).data;
    }
    constructor(public input: Neighborhood_APPDTO) {}

    get data() {
        const _ = this.input;
        const data: Neighborhood_DTO = {
            departamentosId: _.apartmentsId,
            municipioId: _.municipalityId,
            nombre: _.name,
            zonaId: _.zoneId
        }
        return JSON.stringify(data);
    }
}

export class Neighborhood {
    static setProperty(input: Neighborhood_API) {
        return new Neighborhood(input).data;
    }
    constructor(public input: Neighborhood_API) {}

    get data(): Neighborhood_APP {
        const _ = this.input;
        return {
            apartments: Apartment.setProperty(_.departamentos),
            municipality: Municipaly.setProperty(_.municipio),
            name: _.nombre,
            zone: TypeZone.setProperty(_.zona),
            id: _.id
        };
    }
}