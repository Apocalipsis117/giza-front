import { createAction, props } from '@ngrx/store';
import { MenuShortcutShortcutMenu } from '@interfaces/index';

export const action_add_tabsController = createAction(
    '[tabs-controller] add',
    props<{ data: MenuShortcutShortcutMenu }>()
);

export const action_delete_tabController = createAction(
    '[tabs-controller] delete',
    props<{ uuid: string }>()
);

export const action_updateActive_tabController = createAction(
    '[tabs-controller] update-active',
    props<{ uuid: string }>()
);

export const action_defuse_tabController = createAction(
    '[tabs-controller] defuse-active'
);