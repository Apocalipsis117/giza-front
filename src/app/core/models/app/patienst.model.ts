import { calcutate, queryData } from "@helpers/index";
import { patientsApp } from "@interfaces/index";

export class ModelPatientsApp {
    static setProperty(dataInput: any[]): patientsApp[] {
        return new ModelPatientsApp(dataInput).data;
    }

    constructor(public dataInput: any[]) {}

    get data() {
        return this.dataInput.map((item: any) => {
            const age = calcutate.calcularEdad(item.fecha_nacimiento);
            const avatar = queryData.avatar(age, item.sexo);
            return {
                id: item.id,
                age,
                name: item.nombre,
                dateOfBirth: item.fecha_nacimiento,
                identityNumber: item.numero_identidad,
                gender: item.sexo,
                avatar,
                medicalHistory: {
                    bloodPressure: item.historial_medico.presion_arterial || null,
                    preexistingConditions: item.historial_medico.enfermedades_previas || [],
                    allergies: item.historial_medico.alergias || [],
                    personalHistory: item.historial_medico.antecedentes_personales || [],
                    familyHistory: item.historial_medico.antecedentes_familiares || [],
                    chronicCondition: item.historial_medico.enfermedad_cronica || "ninguna",
                    lifestyle: item.historial_medico.estilo_de_vida || null,
                    habits: item.historial_medico.habitos || [],
                    severityLevel: item.historial_medico.nivel_gravedad || null,
                },
                contact: {
                    phone: item.contacto.telefono,
                    address: item.contacto.direccion,
                    email: item.contacto.correo_electronico,
                },
            }
        });
    }
}
