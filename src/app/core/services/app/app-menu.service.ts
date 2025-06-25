import { Injectable } from '@angular/core';
import { BarActionToolBarActions, DataMenuAside, MenuShortcutShortcutMenu, StepSteps, UserActionMenuUserActions } from '@interfaces/index';
import jsonBarTool from '@local-data/app/bar-tool-actions.json';
import jsonMenuAsideConfig from '@local-data/app/menu-aside-config.json';
import jsonMenuAudit from '@local-data/app/menu-shortcut-audit.json';
import jsonMenuClinicHistory from '@local-data/app/menu-shortcut-clinic-history.json';
import jsonMenuHome from '@local-data/app/menu-shortcut-home.json';
import jsonMenuPharmacy from '@local-data/app/menu-shortcut-pharmacy.json';
import jsonMenuPrincipal from '@local-data/app/menu-shortcut-principal.json';
import jsonMenuSetting from '@local-data/app/menu-shortcut-setting.json';
import jsonMenuTariff from '@local-data/app/menu-shortcut-tariff.json';
import jsonMenuAside from '@local-data/app/menu-side.json';
import jsonSteps from '@local-data/app/tabs-steps.json';
import jsonUserAction from '@local-data/app/user-action.json';
import { ModelMenuAside, ModelMenutoolbar, ModelMenuShortcut } from '@models/index';
import { Observable, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppMenuService {
    get menu(): DataMenuAside {
        return ModelMenuAside.setProperty(jsonMenuAside.data);
    }

    get menuConfig(): MenuShortcutShortcutMenu[] {
        return ModelMenuShortcut.setProperty(jsonMenuAsideConfig.data);
    }

    get menuUser(): UserActionMenuUserActions[] {
        return jsonUserAction.data.userActions;
    }

    get steps(): StepSteps[] {
        return jsonSteps.data.steps;
    }

    menuTools(): BarActionToolBarActions[] {
        return ModelMenutoolbar.setProperty(jsonBarTool.data);
    }

    menuShorcut(typeMenu: string | null): Observable<MenuShortcutShortcutMenu[] | []> {
        const menuMap: { [key: string]: any; } = {
            'clinic-history': jsonMenuClinicHistory,
            'setting': jsonMenuSetting,
            'pharmacy': jsonMenuPharmacy,
            'tariff': jsonMenuTariff,
            'audit': jsonMenuAudit,
            'principal': jsonMenuPrincipal,
            'home': jsonMenuHome,
        };

        if (typeMenu && menuMap[typeMenu]) {
            return of(menuMap[typeMenu]).pipe(map(data => ModelMenuShortcut.setProperty(data.data)));
        }

        return of([]);
    }
}
