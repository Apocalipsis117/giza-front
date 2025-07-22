import * as actions from '@actions/singles.action';
import { State_singles } from '@interfaces/app';
import { createReducer, on } from '@ngrx/store';

const state: State_singles = {
    genders: [],
    typeHistory: [],
    purposeConsultation: [],
    externalCause: [],
    levelService: [],
    typeModality: [],
    departments: [],
    municipalities: []
}
export const reducer_singles = createReducer(
    state,
    on(actions.action_singles_options, (state, { data, name }) => ({
        ...state,
        [name]: data
    })),
);