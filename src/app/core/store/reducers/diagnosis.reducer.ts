import * as actions from '@actions/diagnosis.action';
import { State_diagnosisGroup } from '@interfaces/app';
import { createReducer, on } from '@ngrx/store';

const state: State_diagnosisGroup = {
    options: []
}
export const reducer_diagnosis = createReducer(
    state,
    on(actions.action_diagnosis_options, (state, { data }) => ({
        ...state,
        options: data
    })),
);