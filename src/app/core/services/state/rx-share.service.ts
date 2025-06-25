import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '@actions/share.action';
import * as selectors from '@selectors/share.select';
import { MenuShortcutShortcutMenu, NavegationMenuAside } from '@interfaces/index';
import { distinctUntilChanged, map, take } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RxShareService {
    private appstore = inject(Store);

    get getShare() {
        return this.appstore.select(selectors.select_share).pipe(
            distinctUntilChanged(),
            take(1)
        )
    }

    // para componentes que no multiplican el take
    get watchShare() {
        return this.appstore.select(selectors.select_share)
    }

    changeSection(data: NavegationMenuAside) {
        this.appstore.dispatch(actions.action_change_section({ data }));
    }

    changeView(data: MenuShortcutShortcutMenu | null) {
        this.appstore.dispatch(actions.action_change_view({ data }))
    }

    updatePath(path: string | null) {
        this.appstore.dispatch(actions.action_go_path({ path }))
    }
}
