import * as actions from '@actions/app-gisa.action';
import { State_appGisa } from '@interfaces/app';
import { createReducer, on } from '@ngrx/store';

const state: State_appGisa = {
    config: {
        color: 'default',
        mode: 'light',
        menu: 'menu-aside'
    }
}
export const reducer_appGisa = createReducer(
    state,
    on(actions.action_color_appGisa, (state, { value }) => ({
        ...state,
        config: { ...state.config, color: value }
    })),
    on(actions.action_mode_appGisa, (state, { value }) => ({
        ...state,
        config: { ...state.config, mode: value }
    })),
    on(actions.action_menu_appGisa, (state, { value }) => ({
        ...state,
        config: { ...state.config, menu: value }
    }))
);