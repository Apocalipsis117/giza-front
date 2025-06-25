import { createAction, props } from '@ngrx/store';
import { MenuShortcutShortcutMenu, NavegationMenuAside } from '@interfaces/index';

export const action_change_section = createAction(
    '[share] change current section',
    props<{ data: NavegationMenuAside }>()
);

export const action_change_view = createAction(
    '[share] change view',
    props<{ data: MenuShortcutShortcutMenu | null }>()
);

export const action_go_path = createAction(
    '[share] update path',
    props<{ path: string | null }>()
);