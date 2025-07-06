import { Institutions_API, Institutions_APP, Institutions_APPDTO, Institutions_DTO } from "@interfaces/index";
import { Apartment, Municipaly } from "./apartment-cities.model";
import { NameIdEntity } from "../single-query/name-entity.m";

export class InstitutionsDTO {
    static setProperty(input: Institutions_APPDTO) {
        return new InstitutionsDTO(input).data;
    }
    constructor(public input: Institutions_APPDTO) {}

    get data() {
        const data: Institutions_DTO = {
            codigoHabitacion: this.input.roomCode,
            correo: this.input.email,
            departamentoId: this.input.departmentId,
            direccion: this.input.address,
            municipioId: this.input.municipalityId,
            naturalezaJuridicaId: this.input.legalNatureId,
            nivelComplejidadId: this.input.complexityLevelId,
            nombre: this.input.name,
            telefono: this.input.phone,
            tipoRemisionId: this.input.referralTypeId
        }
        return JSON.stringify(data);
    }
}

export class Institutions {
    static setProperty(input: Institutions_API) {
        return new Institutions(input).data;
    }
    constructor(public input: Institutions_API) {}

    get data(): Institutions_APP {
        const _ = this.input;
        return {
            address: _.direccion,
            complexityLevel: NameIdEntity.setProperty(_.nivelComplejidad),
            department: Apartment.setProperty(_.departamento),
            email: _.correo,
            id: _.id,
            legalNature: NameIdEntity.setProperty(_.naturalezaJuridica),
            municipality: Municipaly.setProperty(_.municipio),
            name: _.nombre,
            phone: _.telefono,
            referralType: NameIdEntity.setProperty(_.tipoRemision),
            roomCode: _.codigoHabitacion
        };
    }
}