import { FormControlOption, FormControlValue } from "@interfaces/index";

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
        return options.sort((a, b) => a.name.localeCompare(b.name));
    },
    findOption(value: FormControlValue, options: FormControlOption[] = []): FormControlOption | undefined {
        if (!value || options.length === 0) return undefined;

        return options.find(option =>
            option.value === value || option.name === value
        );
    }
};