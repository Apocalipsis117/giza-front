import { createSelector } from '@ngrx/store';
import { AppStore } from '@interfaces/app';

const state = (state: AppStore) => state.user;

export const select_user_data_login = createSelector(
    state, (state) => state.login
);