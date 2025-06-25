import * as actions from '@actions/share.action';
import { State_share } from '@interfaces/app';
import { createReducer, on } from '@ngrx/store';

const state: State_share = {
    currentSection: null,
    currentView: null,
    goPath: '/'
}
export const reducer_share = createReducer(
    state,
    on(actions.action_change_section, (state, { data }) => ({
        ...state,
        currentSection: data
    })),
    on(actions.action_change_view, (state, { data }) => ({
        ...state,
        currentView: data
    })),
    on(actions.action_go_path, (state, { path }) => ({
        ...state,
        goPath: path ? path : '/'
    }))
);