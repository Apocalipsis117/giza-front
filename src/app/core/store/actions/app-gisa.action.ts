import { createAction, props } from '@ngrx/store';
import { AppColor, AppMenu, AppMode } from '@interfaces/index';

export const action_color_appGisa = createAction(
    '[appGisa] change color',
    props<{ value: AppColor }>()
);

export const action_mode_appGisa = createAction(
    '[appGisa] change mode',
    props<{ value: AppMode }>()
);

export const action_menu_appGisa = createAction(
    '[appGisa] change menu',
    props<{ value: AppMenu }>()
);
