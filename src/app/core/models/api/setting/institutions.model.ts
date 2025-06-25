import { InstitutionDTO_API } from "@interfaces/api/institution.i";
import { InstitutionDTO_APP } from "@interfaces/app";

export class InstitutionDTO {
    static setProperty(dataInput: InstitutionDTO_APP): string {
        return new InstitutionDTO(dataInput).data;
    }
    constructor(public dataInput: InstitutionDTO_APP) {}

    get data(): string {
        const data: InstitutionDTO_API = {
            codigo: this.dataInput.code,
            codigoHabitacion: this.dataInput.roomCode,
            nombre: this.dataInput.name,
            direccion: this.dataInput.address,
            telefono: this.dataInput.phone,
            correo: this.dataInput.email,
            aRemitir: this.dataInput.toRefer,
            queRemiten: this.dataInput.whoRefer,
            departamentoId: this.dataInput.departmentId,
            ciudadId: this.dataInput.cityId,
            nivelComplejidadId: this.dataInput.complexityLevelId,
            naturalezaJuridicaId: this.dataInput.legalNatureId
        }
        return JSON.stringify(data);
    }
}