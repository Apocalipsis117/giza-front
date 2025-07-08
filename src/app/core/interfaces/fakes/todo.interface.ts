export interface Todo {
    title: string
}

export interface TodoStorage {
    title: string;
    todo: Todo[];
}

export interface Todo_APPDTO {
    todo: string;
    description: string;
    typeTodoUuid: string;
    status: boolean;
    days: number;
    dateEnd: Date;
}