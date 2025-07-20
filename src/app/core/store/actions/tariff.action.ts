import { State_tariff } from '@interfaces/app';
import { FormControlOption } from '@interfaces/index';
import { createAction, props } from '@ngrx/store';

export const action_tariff_options = createAction(
    '[singles] options',
    props<{ data: FormControlOption[], name: keyof State_tariff }>()
);
