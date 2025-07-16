import { FormControlOption, FormControlValue } from "@interfaces/index";
import { utilieHelper } from "./utilieHelper";

export const formHelper = {
    filterAndSortItems(options: FormControlOption[], currentValue: FormControlValue[]) {
        if (!Array.isArray(options) || !Array.isArray(currentValue)) {
            throw new Error('Both options and currentValue must be arrays');
        }

        const filteredItems = options.filter(item =>
            item && typeof item === 'object' && 'name' in item && currentValue.includes(item.value)
        );

        return filteredItems.sort((a, b) =>
            currentValue.indexOf(a.value) - currentValue.indexOf(b.value)
        );
    },
    sortByName(options: FormControlOption[]): FormControlOption[] {
        const ops = utilieHelper.cloneValue(options) as FormControlOption[];
        return ops.sort((a, b) => a.name.localeCompare(b.name));
    },
    findOption(value: FormControlValue, options: FormControlOption[] = []): FormControlOption | undefined {
        if (!value || options.length === 0) return undefined;

        return options.find(option =>
            option.value === value || option.name === value
        );
    },
    genderValids(select: number, options: FormControlOption[]) {
        const selectedOption = options.find(opt => opt.value === select);
        if (!selectedOption) {
            throw new Error("Opción no encontrada");
        }

        if (String(selectedOption.value).includes('3')) {
            const validValues = options.map(opt => opt.value);

            return {
                valids: validValues,
                message: `Seleccione sexo: ${options.map(x => x.name).join(", ")}`,
            };
        }

        return {
            valids: [selectedOption.value],
            message: `Solo sexo: ${selectedOption.name}`,
        };
    }
};