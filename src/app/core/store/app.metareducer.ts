import { ActionReducer, MetaReducer } from '@ngrx/store';

const PREFIX_STORAGE = 'gisa';
const PERSISTED_KEYS = ['tabsController', 'share', 'appGisa'];

class LocalStorageHelper {
    private prefix: string;
    private keys: string[];

    constructor(prefix: string, keys: string[]) {
        this.prefix = prefix;
        this.keys = keys;
    }

    saveStateToLocalStorage(state: any): void {
        if (typeof localStorage === 'undefined') return;

        this.keys.forEach((key) => {
            if (state[key] !== undefined) {
                localStorage.setItem(`${this.prefix}_${key}`, JSON.stringify(state[key]));
            }
        });
    }

    loadStateFromLocalStorage(): any {
        if (typeof localStorage === 'undefined') return {};

        return this.keys.reduce((acc: any, key) => {
            const savedState = localStorage.getItem(`${this.prefix}_${key}`);
            if (savedState) {
                acc[key] = JSON.parse(savedState);
            }
            return acc;
        }, {});
    }
}

const localStorageHelper = new LocalStorageHelper(PREFIX_STORAGE, PERSISTED_KEYS);

function localStorageSyncReducer<T>(reducer: ActionReducer<T>): ActionReducer<T> {
    return (state, action) => {
        if (!state) {
            const loadedState = localStorageHelper.loadStateFromLocalStorage();
            return reducer({ ...state, ...loadedState }, action);
        }
        const nextState = reducer(state, action);
        localStorageHelper.saveStateToLocalStorage(nextState);

        return nextState;
    };
}

export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];
