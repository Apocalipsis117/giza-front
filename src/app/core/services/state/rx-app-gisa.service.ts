import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '@actions/app-gisa.action';
import * as selectors from '@selectors/app-gisa.select';
import { AppColor, AppMenu, AppMode } from '@interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class RxAppGisaService {
    private appstore = inject(Store);

    get watchAppGisa() {
        return this.appstore.select(selectors.select_appGisa)
    }

    changeMenu(value: AppMenu) {
        this.appstore.dispatch(actions.action_menu_appGisa({ value }))
    }

    changeMode(value: AppMode) {
        this.appstore.dispatch(actions.action_mode_appGisa({ value }))
    }

    changeColor(value: AppColor) {
        this.appstore.dispatch(actions.action_color_appGisa({ value }))
    }
}
