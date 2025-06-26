import { createAction, props } from '@ngrx/store';
import { AppColor, AppMenu, AppMode, FormControlOption } from '@interfaces/index';

export const action_appGisa_color = createAction(
    '[appGisa] color',
    props<{ value: AppColor }>()
);

export const action_appGisa_mode = createAction(
    '[appGisa] mode',
    props<{ value: AppMode }>()
);

export const action_appGisa_menu = createAction(
    '[appGisa] menu',
    props<{ value: AppMenu }>()
);

export const action_appGisa_apartaments = createAction(
    '[appGisa] apartaments',
    props<{ data: FormControlOption[] }>()
);

export const action_appGisa_municipalies = createAction(
    '[appGisa] municipalies',
    props<{ data: FormControlOption[] }>()
);
