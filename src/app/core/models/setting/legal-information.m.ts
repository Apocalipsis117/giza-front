import { LegalInformation_API, LegalInformation_APP, LegalInformation_APPDTO, LegalInformation_DTO } from "@interfaces/index";
import { NameIdEntity } from "@models/index";

export class LegalInformationDTO {
    static setProperty(input: LegalInformation_APPDTO, isJson: true): string;
    static setProperty(input: LegalInformation_APPDTO, isJson?: false): LegalInformation_DTO;
    static setProperty(input: LegalInformation_APPDTO, isJson: boolean = true) {
        const d = new LegalInformationDTO(input);
        return isJson ? d.dataJson : d.data;
    }
    constructor(public input: LegalInformation_APPDTO) {}

    get data() {
        const _ = this.input;
        const data: LegalInformation_DTO = {
            estado: _.status,
            imgFirma: _.signatureImg,
            nombre: _.name,
            tipoRepresentanteIpsId: _.healthcareRepTypeId
        }
        return data;
    }
    get dataJson() {
        return JSON.stringify(this.data);
    }
}

export class LegalInformation {
    static setProperty(input: LegalInformation_API) {
        return new LegalInformation(input).data;
    }
    constructor(public input: LegalInformation_API) {}

    get data(): LegalInformation_APP {
        const _ = this.input;
        return {
            healthcareRepType: NameIdEntity.setProperty(_.tipoRepresentanteIps),
            name: _.nombre,
            signaturePath: _.pathFirma,
            status: _.estado,
            uuid: _.uuid
        };
    }
}