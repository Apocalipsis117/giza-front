import { tabsControls } from "@interfaces/index";

export const collapseControls_patients: tabsControls[] = [
    {
        active: true,
        idConnect: 'patients-form-main',
        label: 'Datos principales',
        icon: 'icofont-student-alt'
    },
    {
        active: false,
        idConnect: 'patients-form-other',
        label: 'Otros Datos',
        icon: 'icofont-search-document'
    },
    {
        active: false,
        idConnect: 'patients-form-affiliation',
        label: 'Datos de afiliación',
        icon: 'icofont-ui-clip-board'
    }
];

export const tabsControls_patients: tabsControls[] = [
    {
        active: true,
        idConnect: 'patients-main',
        label: 'Datos principales'
    },
    {
        active: false,
        idConnect: 'patient-list',
        label: 'Pacientes'
    }/*,
    {
        active: false,
        idConnect: 'patient-contracts',
        label: 'Contratos Relacionados'
    }*/
]

