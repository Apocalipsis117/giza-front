import { tabsControls } from "@interfaces/index";

export const tabsControls_employees: tabsControls[] = [
    {
        active: true,
        idConnect: 'tab-0c67-4e46-954b-d0c33840bf47',
        label: 'Nuevo empleado'
    },
    {
        active: false,
        idConnect: 'tab-881f-4cf7-a233-06069e2875a4',
        label: 'Empleados'
    }
]

export const collapseControl_employees: tabsControls[] = [
    {
        active: true,
        idConnect: 'collapse-d905-472f-80a4-372e62702b88',
        label: 'Datos basicos',
        icon: 'icofont-home',
        disable: false,
    },
    {
        active: false,
        idConnect: 'collapse-1ac3-456a-a8a4-62c4e4c4efb6',
        label: 'Prestaciones y servicios',
        icon: 'icofont-home',
        disable: true,
    },
    {
        active: false,
        idConnect: 'collapse-4eb9-4f48-be8e-a2a10b21e09f',
        label: 'COntrato',
        icon: 'icofont-home',
        disable: true,
    }
]