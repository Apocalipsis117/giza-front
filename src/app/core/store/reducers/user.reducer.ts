import * as actions from '@actions/user.action';
import { State_user } from '@interfaces/app';
import { createReducer, on } from '@ngrx/store';

const state: State_user = {
    login: null
}
export const reducer_user = createReducer(
    state,
    on(actions.action_user_login, (state, { data }) => ({
        ...state,
        login: data
    })),
);