import { createSelector } from '@ngrx/store';
import { AppStore } from '@interfaces/app';

const tariffState = (state: AppStore) => state.tariff;

export const select_tariff = <K extends keyof ReturnType<typeof tariffState>>(key: K) =>
  createSelector(tariffState, (state) => state[key]);
