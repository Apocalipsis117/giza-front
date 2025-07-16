import { createSelector } from '@ngrx/store';
import { AppStore } from '@interfaces/app';

const settingState = (state: AppStore) => state.setting;

export const select_setting = <K extends keyof ReturnType<typeof settingState>>(key: K) =>
  createSelector(settingState, (state) => state[key]);