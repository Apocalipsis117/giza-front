import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '@actions/tabs-contoller.action';
import * as selectors from '@selectors/tabs-controller.select';
import { MenuShortcutShortcutMenu } from '@interfaces/index';
import { Observable, map } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RxTabsControllerService {
    private appstore = inject(Store);

    get getTabs(): Observable<MenuShortcutShortcutMenu[]> {
        return this.appstore.select(selectors.select_tabsController).pipe(
            map(data => data),
            distinctUntilChanged()
        );
    }

    addTab(data: MenuShortcutShortcutMenu) {
        this.appstore.dispatch(actions.action_add_tabsController({ data }));
    }

    /**
     * coloca en false el tab activo
     */
    defuseTabs() {
        this.appstore.dispatch(actions.action_defuse_tabController());
    }

    getTab(uuid: string): Observable<MenuShortcutShortcutMenu | undefined> {
        return this.getTabs.pipe(map(data => data.find(item => item.uuid === uuid)));
    }

    deleteTab(uuid: string) {
        this.appstore.dispatch(actions.action_delete_tabController({ uuid }));
    }

    patchTabActive(uuid: string) {
        this.appstore.dispatch(actions.action_updateActive_tabController({ uuid }));
    }
}
