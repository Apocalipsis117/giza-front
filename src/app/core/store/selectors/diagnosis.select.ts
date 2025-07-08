import { createSelector } from '@ngrx/store';
import { AppStore } from '@interfaces/app';

const state = (state: AppStore) => state.diagnosis;

export const select_diagnosisGroup_options = createSelector(
    state, (state) => state.options
);
