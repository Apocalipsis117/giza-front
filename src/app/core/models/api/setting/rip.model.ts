import { RIPConceptAPI, RIPConceptAPP, RIPConceptDTO_API, RIPConceptDTO_APP } from "@interfaces/index";
import { NamedEntity } from "@models/index";

export class RipConceptDTO {
    static setProperty(dataInput: RIPConceptDTO_APP): string {
        return new RipConceptDTO(dataInput).data;
    }

    constructor(public dataInput: RIPConceptDTO_APP) {}

    get data(): string {
        const data: RIPConceptDTO_API = {
            grupoSoatId: this.dataInput.groupSoatId,
            nombre: this.dataInput.name,
            tipoServicioId: this.dataInput.typeServiceId
        };

        return JSON.stringify(data);
    }
}

export class RipConcept {
    static setProperty(dataInput: RIPConceptAPI): RIPConceptAPP {
        return new RipConcept(dataInput).data;
    }
    constructor(public dataInput: RIPConceptAPI) {}

    get data(): RIPConceptAPP {
        return {
            groupSoat: this.dataInput.grupoSoat ? NamedEntity.setProperty(this.dataInput.grupoSoat) : null,
            id: this.dataInput.id,
            name: this.dataInput.nombre,
            typeService: this.dataInput.tipoServicio ? NamedEntity.setProperty(this.dataInput.tipoServicio) : null
        };
    }
}