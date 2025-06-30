import { textTransform } from "./textTransform";

export const compareHelper = {
    compareString(current: string, compare: string) {
        const prim = textTransform.replaceAccent(current).toLowerCase().trim();
        const secc = textTransform.replaceAccent(compare).toLowerCase().trim();

        return {
            current,
            compare,
            equalText: prim === secc,
            notEqualText: prim !== secc,
            includesText: prim.includes(secc),
            startsWithText: prim.startsWith(secc),
            endsWithText: prim.endsWith(secc)
        };
    }
};
