import { createSelector } from '@ngrx/store';
import { AppStore } from '@interfaces/app';

const state = (state: AppStore) => state.tabsController;

export const select_tabsController = createSelector(
    state, (state) => state.tabs
);