import { Applang } from "@interfaces/index";

const colorIndex = [
    {
        indexes: [1, 17, 33],
        color: 'text-red-400'
    },
    {
        indexes: [2, 18, 34],
        color: 'text-rose-400'
    },
    {
        indexes: [3, 19, 35],
        color: 'text-pink-400'
    },
    {
        indexes: [4, 20, 36],
        color: 'text-fuchsia-400'
    },
    {
        indexes: [5, 21, 37],
        color: 'text-purple-400'
    },
    {
        indexes: [6, 22, 38],
        color: 'text-violet-400'
    },
    {
        indexes: [7, 23, 39],
        color: 'text-indigo-400'
    },
    {
        indexes: [8, 24, 40],
        color: 'text-blue-400'
    },
    {
        indexes: [9, 25],
        color: 'text-sky-400'
    },
    {
        indexes: [10, 26],
        color: 'text-cyan-400'
    },
    {
        indexes: [11, 27],
        color: 'text-teal-400'
    },
    {
        indexes: [12, 28],
        color: 'text-green-400'
    },
    {
        indexes: [13, 29],
        color: 'text-lime-400'
    },
    {
        indexes: [14, 30],
        color: 'text-yellow-400'
    },
    {
        indexes: [15, 31],
        color: 'text-amber-400'
    },
    {
        indexes: [16, 32],
        color: 'text-orange-400'
    }
];

export const queryData = {
    avatar(age: number, gender: string | undefined) {
        const avatarAge = [
            { age: [0, 4], femaleAvatar: 'avatar-f-1.jpeg', maleAvatar: 'url_bebe_masculino' },
            { age: [5, 15], femaleAvatar: 'avatar-f-2.jpeg', maleAvatar: 'avatar-m-2.jpeg' },
            { age: [16, 30], femaleAvatar: 'avatar-f-3.jpeg', maleAvatar: 'avatar-m-3.jpeg' },
            { age: [31, 69], femaleAvatar: 'avatar-f-4.jpeg', maleAvatar: 'avatar-m-4.jpeg' },
            { age: [70], femaleAvatar: 'avatar-f-5.jpeg', maleAvatar: 'avatar-m-5.jpeg' },
        ];

        const filtro = avatarAge.find((avatar) => {
            const [inicio, fin = Infinity] = avatar.age;
            return age >= inicio && age <= fin;
        });

        if (!filtro) {
            return "http://localhost/multimedia/tematica/social/avatar/avatar-defecto-f.png";
        }
        const avatar: string = gender === 'f' ? filtro.femaleAvatar : filtro.maleAvatar;
        return 'assets/img/ui/' + avatar;
    },
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
    getLangValue(obj: any[], options: { lang: Applang; key: string }) {
        const x = obj.find(x => x.lang === options.lang);
        return x[options.key];
    },
    getColorByIndex(index: number) {
        for (const group of colorIndex) {
            if (group.indexes.includes(index)) {
                return group.color;
            }
        }
        return 'text-default-600';
    }
}

type GenericObject = Record<string, any>;
export const objectHelper = {
    /**
     * Separa propiedades entre vacías y definidas.
     * Considera vacíos: '', null, undefined, NaN, [], false
     */
    hasValue<T extends GenericObject>(data: T): { empties: Partial<T>, defined: Partial<T> } {
        const empties: Partial<T> = {};
        const defined: Partial<T> = {};

        Object.entries(data).forEach(([key, value]) => {
            const isEmpty =
                value === null ||
                value === undefined ||
                value === '' ||
                value === false ||
                (typeof value === 'number' && isNaN(value)) ||
                (Array.isArray(value) && value.length === 0);

            if (isEmpty) {
                empties[key as keyof T] = value;
            } else {
                defined[key as keyof T] = value;
            }
        });

        return { empties, defined };
    }
};