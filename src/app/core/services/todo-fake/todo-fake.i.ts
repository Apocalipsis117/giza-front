
/**
 * ---------------------------
 * TODO Fake
 * ---------------------------
 */
interface Base_API {
    title:              string;
    description:        string;
    date_start:         Date;
    date_end:           Date;
    hour_start:         string;
    hour_end:           string;
    status:             boolean;
}

export interface TodoFake_API extends Base_API {
    uuid:          string;
    type_priority: TodoType_API;
    todo_type:     TodoType_API;
}

export interface TodoType_API {
    uuid:   string;
    name:   string;
    status?: number;
}


export interface TodoFake_DTO extends Base_API {
    type_priority_uuid: string;
    todo_type_uuid:     string;
}