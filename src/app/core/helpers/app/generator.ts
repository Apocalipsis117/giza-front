export const generator = {
    uuid(prefixe: string = ''): string {
        const prefix = prefixe ? prefixe : 'xxxxxxx';
        return `${prefixe}-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.replace(/[x]/g, (c) => {
            let ramdom = Math.random() * 15 | 0,
                id = c == 'x' ? ramdom : (ramdom & 0x3 | 0x8);
            return id.toString(15);
        });
    },
    formData(data: any) {
        let formData = new FormData();
        for (let i in data) {
            let value = data[i];
            if (typeof value === 'boolean') {
                value = value ? 1 : 0;
            }
            formData.append(i, value);
        }
        return formData;
    },
    objectToQueryString(params: Params): string {
        const queryString = Object.entries(params)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join('&');
        return `?${queryString}`;
    }
}

// interfaces

type Params = {
    [key: string]: string | number | boolean;
};