import { RipConcept_API, RipConcept_APP, RipConcept_APPDTO, RipConcept_DTO } from "@interfaces/index";
import { NameIdEntity } from "../single-query/name-entity.m";

export class RipConceptDTO {
    static setProperty(input: RipConcept_APPDTO) {
        return new RipConceptDTO(input).data;
    }
    constructor(public input: RipConcept_APPDTO) {}

    get data() {
        const _ = this.input;
        const data: RipConcept_DTO = {
            grupoSoatId: _.soatGroupId,
            nombre: _.name,
            tipoServicioId: _.serviceTypeId
        }
        return JSON.stringify(data);
    }
}

export class RipConcept {
    static setProperty(input: RipConcept_API) {
        return new RipConcept(input).data;
    }
    constructor(public input: RipConcept_API) {}

    get data(): RipConcept_APP {
        const _ = this.input;
        return {
            id: _.id,
            name: _.nombre,
            serviceType: NameIdEntity.setProperty(_.tipoServicio),
            soatGroup: NameIdEntity.setProperty(_.grupoSoat)
        };
    }
}