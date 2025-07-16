import * as actions from '@actions/setting.action';
import { State_setting } from '@interfaces/app';
import { createReducer, on } from '@ngrx/store';

const state: State_setting = {
    diagnosis: []
}
export const reducer_setting = createReducer(
    state,
    on(actions.action_setting_options, (state, { data, name }) => ({
        ...state,
        [name]: data
    })),
);