export interface patientsApp {
    id: number;
    name: string;
    age: number;
    avatar: string;
    dateOfBirth: string;
    identityNumber: string;
    gender: string;
    medicalHistory: MedicalHistoryPatientsApp;
    contact: ContactPatientsApp;
}

export interface MedicalHistoryPatientsApp {
    bloodPressure: string | null;
    preexistingConditions: string[];
    allergies: string[];
    personalHistory: string[];
    familyHistory: string[];
    chronicCondition: string;
    lifestyle: string | null;
    habits: string[];
    severityLevel: number | null;
}
export interface ContactPatientsApp {
    phone: string;
    address: string;
    email: string;
}