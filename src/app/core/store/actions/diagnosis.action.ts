import { FormControlOption } from '@interfaces/index';
import { createAction, props } from '@ngrx/store';

export const action_diagnosis_options = createAction(
    '[fiagnosis-group] options',
    props<{ data: FormControlOption[] }>()
);
