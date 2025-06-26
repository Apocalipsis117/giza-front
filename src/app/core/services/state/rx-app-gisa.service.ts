import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '@actions/app-gisa.action';
import * as selectors from '@selectors/app-gisa.select';
import { AppColor, AppMenu, AppMode, FormControlOption } from '@interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class RxAppGisaService {
    private appstore = inject(Store);

    get watchConfig() {
        return this.appstore.select(selectors.select_appGisa_config)
    }

    get watchCountries() {
        return this.appstore.select(selectors.select_appGisa_countries)
    }

    changeMenu(value: AppMenu) {
        this.appstore.dispatch(actions.action_appGisa_menu({ value }))
    }

    changeMode(value: AppMode) {
        this.appstore.dispatch(actions.action_appGisa_mode({ value }))
    }

    changeColor(value: AppColor) {
        this.appstore.dispatch(actions.action_appGisa_color({ value }))
    }

    dispachApartaments(data: FormControlOption[]) {
        this.appstore.dispatch(actions.action_appGisa_apartaments({ data }))
    }

    dispachMinicipalies(data: FormControlOption[]) {
        this.appstore.dispatch(actions.action_appGisa_municipalies({ data }))
    }
}
