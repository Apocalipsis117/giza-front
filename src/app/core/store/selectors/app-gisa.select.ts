import { createSelector } from '@ngrx/store';
import { AppStore } from '@interfaces/app';

const state = (state: AppStore) => state.appGisa;

export const select_appGisa_config = createSelector(
    state, (state) => state.config
);

export const select_appGisa_countries = createSelector(
    state, (state) => ({
        apartaments: state.apartaments,
        minicipalies: state.municipalies
    })
);