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

interface Response {
    status: number;
    statusName: string;
    message: string;
}

export interface ResponseAPI<T> extends Response {
    data: T;
}

export interface ResponsePAGE_API<T> extends Response {
    data: PageAPI<T>;
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