export class XPaginatorTable {
    private itemsPerPage: number;
    private currentPage: number;
    private totalPages: number;
    private dataArray: any[];

    constructor(dataArray: any[], itemsPerPage: number) {
        this.dataArray = dataArray;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.totalPages = Math.ceil(dataArray.length / itemsPerPage);
    }

    private paginateData(): any[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.dataArray.slice(startIndex, endIndex);
    }

    private sortDataBy(column: keyof any, ascending: boolean = true): void {
        this.dataArray.sort((a, b) => {
            const valueA = a[column];
            const valueB = b[column];
            if (valueA === valueB) {
                return 0;
            }
            if (ascending) {
                return valueA < valueB ? -1 : 1;
            } else {
                return valueA > valueB ? -1 : 1;
            }
        });
    }

    public getCurrentPageData(): any[] {
        return this.paginateData();
    }

    public goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        } else {
            alert(`La página debe estar entre 1 y ${this.totalPages}`);
        }
    }

    public goToFirstPage(): void {
        this.currentPage = 1;
    }

    public goToLastPage(): void {
        this.currentPage = this.totalPages;
    }

    public goToNextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }

    public goToPreviousPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    public setItemsPerPage(itemsPerPage: number): void {
        this.itemsPerPage = itemsPerPage;
        this.totalPages = Math.ceil(this.dataArray.length / itemsPerPage);
        this.goToPage(1);
    }

    public sortBy(column: keyof any, ascending: boolean = true): void {
        this.sortDataBy(column, ascending);
        this.goToPage(1);
    }
}
