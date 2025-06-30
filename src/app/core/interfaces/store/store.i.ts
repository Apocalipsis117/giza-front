import { AppGisa, DataAssociated, FormControlOption, Login_API, NavegationMenuAside } from "@interfaces/index";
import { MenuShortcutShortcutMenu } from "@interfaces/index";

export interface AppStore {
    tabsController: State_tabsController;
    share: State_share;
    appGisa: State_appGisa;
    user: State_user;
}

export interface State_share {
    currentSection: NavegationMenuAside | null;
    currentView: MenuShortcutShortcutMenu | null;
    goPath: string;
}

export interface State_tabsController {
    tabs: MenuShortcutShortcutMenu[];
}

export interface State_appGisa {
    config: AppGisa;
    apartaments: FormControlOption[];
    municipalies: FormControlOption<DataAssociated>[];
}

export interface State_user {
    login: Login_API | null;
}
