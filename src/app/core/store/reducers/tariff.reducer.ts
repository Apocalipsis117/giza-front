import * as actions from '@actions/setting.action';
import { State_tariff } from '@interfaces/app';
import { createReducer, on } from '@ngrx/store';

const state: State_tariff = {
    mTransferRate: []
}
export const reducer_tariff = createReducer(
    state,
    on(actions.action_setting_options, (state, { data, name }) => ({
        ...state,
        [name]: data
    })),
);