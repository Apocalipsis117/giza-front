import { AssistanceServ_DTO, AssistanceServiceAPI } from '@interfaces/index';
import { AssistanceServDTO_APP, AssistanceServiceAPP } from '@interfaces/app';

export class AssistanceServDTO {
    static setProperty(dataInput: AssistanceServDTO_APP): string {
        return new AssistanceServDTO(dataInput).data;
    }

    constructor(public dataInput: AssistanceServDTO_APP) {}

    get data(): string {
        const data: AssistanceServ_DTO = {
            nombre: this.dataInput.name,
            diasOportunidad: this.dataInput.opportunityDays,
            codigoIndicador: this.dataInput.indicatorCode,
            activaInstitucion: this.dataInput.activeInstitution,
            citas: this.dataInput.appointments,
            recibir: this.dataInput.receive,
            rCirugia: this.dataInput.surgeryRequired,
            especialista: this.dataInput.specialist,
            medico: this.dataInput.doctor,
            tipoHistoriaId: this.dataInput.historyTypeId,
            tipoServicioId: this.dataInput.serviceTypeId,
            nivelServicioId: this.dataInput.serviceLevelId,
        };
        return JSON.stringify(data);
    }
}


export class AsistanceServ {
    static setProperty(dataInput: AssistanceServiceAPI): AssistanceServiceAPP {
        return new AsistanceServ(dataInput).data;
    }
    constructor(public dataInput: AssistanceServiceAPI) {}

    get data(): AssistanceServiceAPP {
        return {
            id: this.dataInput.id,
            name: this.dataInput.nombre,
            opportunityDays: this.dataInput.diasOportunidad,
            indicatorCode: this.dataInput.codigoIndicador,
            isActiveInstitution: this.dataInput.activaInstitucion,
            appointments: this.dataInput.citas,
            receive: this.dataInput.recibir,
            surgeryRequired: this.dataInput.rCirugia,
            specialist: this.dataInput.especialista,
            doctor: this.dataInput.medico,
            creationDate: this.dataInput.fechaCreacion,
            historyType: this.mapTypeHistoryAPItoAPP,
            serviceType: this.mapTypeServiceAPItoAPP,
            serviceLevel: this.mapServiceLevelAPItoAPP,
        };
    }

    private get mapTypeHistoryAPItoAPP() {
        return {
            id: this.dataInput.tipoHistoria.id,
            name: this.dataInput.tipoHistoria.nombre,
            withExt: this.dataInput.tipoHistoria.conExt,
            minAge: this.dataInput.tipoHistoria.edadMin,
            maxAge: this.dataInput.tipoHistoria.edadMax,
            gender: this.dataInput.tipoHistoria.pSexo,
            pyp: this.dataInput.tipoHistoria.pyp,
        };
    }

    private get mapTypeServiceAPItoAPP() {
        return {
            id: this.dataInput.tipoServicio.id,
            name: this.dataInput.tipoServicio.nombre,
        };
    }

    private get mapServiceLevelAPItoAPP() {
        return {
            id: this.dataInput.nivelServicio.id,
            name: this.dataInput.nivelServicio.nombre,
        };
    }
}