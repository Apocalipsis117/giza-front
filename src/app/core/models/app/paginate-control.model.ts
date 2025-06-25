import { PaginateAPP } from "@interfaces/index";

export class PaginateControlAPP {
    static setProperty(dataInput: any): PaginateAPP {
        return new PaginateControlAPP(dataInput).data;
    }
    constructor(public dataInput: any) {}

    get data(): PaginateAPP {
        return {
            size: this.dataInput.size,
            first: this.dataInput.first,
            last: this.dataInput.last,
            pages: this.dataInput.totalPages,
            numberOfElements: this.dataInput.numberOfElements,
            page: this.dataInput.number,
            options: this.options
        };
    }

    private get options(): number[] {
        const options = [];
        for (let i = 0; i < this.dataInput.totalPages; i++) {
            options.push(i + 1);
        }
        return options;
    }
}