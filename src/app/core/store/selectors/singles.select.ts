import { createSelector } from '@ngrx/store';
import { AppStore } from '@interfaces/app';

const singlesState = (state: AppStore) => state.singles;

export const select_singles = <K extends keyof ReturnType<typeof singlesState>>(key: K) =>
  createSelector(singlesState, (state) => state[key]);
