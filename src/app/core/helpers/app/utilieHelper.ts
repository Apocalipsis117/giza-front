export const utilieHelper = {
    cloneValue(value: any) {
        if (typeof value === 'object' && value !== null) {
            let clonedValue: any = Array.isArray(value) ? [] : {};
            for (const key in value) {
                if (Object.prototype.hasOwnProperty.call(value, key)) {
                    clonedValue[key] = this.cloneValue(value[key]);
                }
            }

            return clonedValue;
        }
        else {
            return value;
        }
    },
    getValueFromString(input: string, key: string) {
        const regex = new RegExp(`${key}\\s*:\\s*([^,]+)`);
        const match = input.match(regex);

        return match ? match[1].trim() : null;
    },
    parseStringToObject(input: string): any {
        const result: Record<string, string | number | boolean> = {};
        const pairs = input.split(',');

        for (const pair of pairs) {
            const [key, value] = pair.split(':').map(part => part.trim());
            if (!key || value === undefined) continue;
            // Detectar tipo de valor
            if (!isNaN(Number(value))) {
                result[key] = Number(value); // Número
            } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
                result[key] = value.toLowerCase() === 'true'; // Booleano
            } else {
                result[key] = value; // String
            }
        }

        return result;
    },
    arrayToMultilineString(arr: string[]): string {
      return arr.join('\n');
    }
}