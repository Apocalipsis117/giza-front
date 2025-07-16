import { State_singles } from '@interfaces/app';
import { FormControlOption } from '@interfaces/index';
import { createAction, props } from '@ngrx/store';

export const action_singles_options = createAction(
    '[singles] options',
    props<{ data: FormControlOption[], name: keyof State_singles }>()
);
