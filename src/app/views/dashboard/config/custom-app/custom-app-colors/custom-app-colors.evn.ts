import { FormControlOptionColor, FormControlOption } from "@interfaces/index";

export const optionsMode: FormControlOption[] = [
    {
        name: 'Oscuro',
        value: 'dark'
    },
    {
        name: 'Claro',
        value: 'light'
    },
    {
        name: 'Sistema',
        value: 'system'
    }
];
export const optionsColor: FormControlOption[] = [
    {
        name: 'Predeterminado',
        value: 'default'
    },
    {
        name: 'Personalizado',
        value: 'custom'
    }
];
export const optionsColors: FormControlOptionColor[] = [
    {
        cssClass: 'bg-default-500',
        value: 'default',
        name: 'Default'
    },
    {
        cssClass: 'bg-purple-500',
        value: 'purple',
        name: 'Purple'
    },
    {
        cssClass: 'bg-pink-500',
        value: 'pink',
        name: 'Pink'
    },
    {
        cssClass: 'bg-orange-500',
        value: 'orange',
        name: 'Orange'
    },
    {
        cssClass: 'bg-yellow-500',
        value: 'yellow',
        name: 'Yellow'
    },
    {
        cssClass: 'bg-cyan-500',
        value: 'cyan',
        name: 'Cyan'
    },
    {
        cssClass: 'bg-green-500',
        value: 'green',
        name: 'Green'
    },
    {
        cssClass: 'bg-teal-500',
        value: 'teal',
        name: 'Teal'
    },
    {
        cssClass: 'bg-gray-500',
        value: 'gray',
        name: 'Gray'
    }
];