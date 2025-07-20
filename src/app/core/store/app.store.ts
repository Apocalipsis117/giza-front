import { ActionReducerMap } from '@ngrx/store';
import { AppStore } from '@interfaces/app';
import { reducer_tabsController } from './reducers/tabs-contoller.reducer';
import { reducer_share } from '@reducers/share.reducer';
import { reducer_appGisa } from '@reducers/app-gisa.reducer';
import { reducer_user } from '@reducers/user.reducer';
import { reducer_setting } from '@reducers/setting.reducer';
import { reducer_singles } from '@reducers/singles.reducer';
import { reducer_tariff } from '@reducers/tariff.reducer';

export const ROOT_REDUCER: ActionReducerMap<AppStore> = {
    tabsController: reducer_tabsController,
    share: reducer_share,
    appGisa: reducer_appGisa,
    user: reducer_user,
    setting: reducer_setting,
    singles: reducer_singles,
    tariff: reducer_tariff
}