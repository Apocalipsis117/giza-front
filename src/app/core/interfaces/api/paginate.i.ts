export interface PaginateAPI {
    pageable: PageableAPI;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: SortPaginateAPI;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

interface PageableAPI {
    pageNumber: number;
    pageSize: number;
    sort: SortPaginateAPI;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

interface SortPaginateAPI {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}