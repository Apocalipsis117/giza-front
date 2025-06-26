import * as actions from '@actions/app-gisa.action';
import { State_appGisa } from '@interfaces/app';
import { createReducer, on } from '@ngrx/store';

const state: State_appGisa = {
    config: {
        color: 'default',
        mode: 'light',
        menu: 'menu-aside'
    },
    apartaments: [],
    municipalies: []
}
export const reducer_appGisa = createReducer(
    state,
    on(actions.action_appGisa_color, (state, { value }) => ({
        ...state,
        config: { ...state.config, color: value }
    })),
    on(actions.action_appGisa_mode, (state, { value }) => ({
        ...state,
        config: { ...state.config, mode: value }
    })),
    on(actions.action_appGisa_menu, (state, { value }) => ({
        ...state,
        config: { ...state.config, menu: value }
    })),
    on(actions.action_appGisa_apartaments, (state, { data }) => ({
        ...state,
        apartaments: data
    })),
    on(actions.action_appGisa_municipalies, (state, { data }) => ({
        ...state,
        municipalies: data
    }))
);