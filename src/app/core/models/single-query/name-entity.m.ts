import { NameIdEntity_API, NameIdEntity_APP, NameStateEntity_API, NameStateEntity_APP, NameStateEntity_APPDTO, NameStateEntity_DTO } from "@interfaces/index";

export class NameIdEntityDTO {
    static setProperty(input: NameIdEntity_APP) {
        return new NameIdEntityDTO(input).data;
    }
    constructor(public input: NameIdEntity_APP) {}

    get data() {
        const data: NameIdEntity_API = {
            id: this.input.id,
            nombre: this.input.name
        }
        return JSON.stringify(data);
    }
}

export class NameIdEntity {
    static setProperty(input: NameIdEntity_API) {
        return new NameIdEntity(input).data;
    }
    constructor(public input: NameIdEntity_API) {}

    get data(): NameIdEntity_APP {
        return {
            id: this.input.id,
            name: this.input.nombre
        };
    }
}

export class NameStateEntityDTO {
    static setProperty(input: NameStateEntity_APPDTO) {
        return new NameStateEntityDTO(input).data;
    }
    constructor(public input: NameStateEntity_APPDTO) {}

    get data() {
        const data: NameStateEntity_DTO = {
            estado: this.input.state,
            nombre: this.input.name
        }
        return JSON.stringify(data);
    }
}

export class NameStateEntity {
    static setProperty(input: NameStateEntity_API) {
        return new NameStateEntity(input).data;
    }
    constructor(public input: NameStateEntity_API) {}

    get data(): NameStateEntity_APP {
        return {
            id: this.input.id,
            name: this.input.nombre,
            state: this.input.estado
        };
    }
}