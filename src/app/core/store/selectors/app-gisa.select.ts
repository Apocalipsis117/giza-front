import { createSelector } from '@ngrx/store';
import { AppStore } from '@interfaces/app';

const state = (state: AppStore) => state.appGisa;

export const select_appGisa = createSelector(
    state, (state) => state
);