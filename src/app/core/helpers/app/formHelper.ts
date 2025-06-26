import { FormControlOption } from "@interfaces/index";

export const formHelper = {
    filterAndSortItems(options: FormControlOption[], currentValue: (string | number)[]) {
        if (!Array.isArray(options) || !Array.isArray(currentValue)) {
            throw new Error('Both options and currentValue must be arrays');
        }

        const filteredItems = options.filter(item =>
            item && typeof item === 'object' && 'name' in item && currentValue.includes(String(item.value))
        );

        return filteredItems.sort((a, b) =>
            currentValue.indexOf(String(a.value)) - currentValue.indexOf(String(b.value))
        );
    },
    sortByName(options: FormControlOption[]): FormControlOption[] {
        return options.sort((a, b) => a.name.localeCompare(b.name));
    }
};