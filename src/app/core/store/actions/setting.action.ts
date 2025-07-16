import { State_setting } from '@interfaces/app';
import { FormControlOption } from '@interfaces/index';
import { createAction, props } from '@ngrx/store';

export const action_setting_options = createAction(
    '[setting] options-diagnosis',
    props<{ data: FormControlOption[], name: keyof State_setting }>()
);
