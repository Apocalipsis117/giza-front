import { ActionReducerMap } from '@ngrx/store';
import { AppStore } from '@interfaces/app';
import { reducer_tabsController } from './reducers/tabs-contoller.reducer';
import { reducer_share } from '@reducers/share.reducer';
import { reducer_appGisa } from '@reducers/app-gisa.reducer';
import { reducer_user } from '@reducers/user.reducer';
import { reducer_diagnosis } from '@reducers/diagnosis.reducer';

export const ROOT_REDUCER: ActionReducerMap<AppStore> = {
    tabsController: reducer_tabsController,
    share: reducer_share,
    appGisa: reducer_appGisa,
    user: reducer_user,
    diagnosis: reducer_diagnosis
}