import { createAction, props } from '@ngrx/store';
import { Login_API } from '@interfaces/index';

export const action_user_login = createAction(
    '[user-login] data sesion',
    props<{ data: Login_API | null }>()
);