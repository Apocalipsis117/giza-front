/**
 * Interface for Paginate API
 * @param T[] - Type of the content
 * example: PageAPI<User>
 */
export interface PageAPI<T> extends PageDataAPI {
    content: T[];
}

export interface PageDataAPI {
    pageNumber:    number;
    pageSize:      number;
    totalElements: number;
    totalPages:    number;
    last:          boolean;
}

export interface ResponseAPI<T> {
    data: T;
    status: number;
    statusName: string;
    message: string;
}

/**
 * API name
 */

export interface PathNameAPI {
    base: string;
    page?: string;
    save?: string;
    login?: string;
    list?: string;
    delete?: string;
    update?: string;
    byUuid?: string;
    byId?: string;
    stadistic?: string;
    download?: string;
    emailSend?: string;
}