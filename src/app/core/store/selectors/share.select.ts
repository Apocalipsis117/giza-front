import { createSelector } from '@ngrx/store';
import { AppStore } from '@interfaces/app';

const state = (state: AppStore) => state.share;

export const select_share = createSelector(
    state, (state) => state
);