// shared

/**
 * @NOTA
 * update interface DisplayValues
 * cada que se agrege un nuevo atributo a DisplayLang se agregara aqui
 */
export interface DisplayLang {
    lang: string;
    title?: string;
    description?: string;
    name?: string;
    label?: string;
}

// menu aside
export interface MenuAside {
    data: DataMenuAside;
}

export interface DataMenuAside {
    navegation: NavegationMenuAside[];
    setting: NavegationMenuAside[];
}

export interface NavegationMenuAside {
    id: number;
    path: string;
    display: string;
    icon: string;
    name: string;
}

// menu de usuario
export interface MenuUserActions {
    data: DataMenuUserActions;
}

export interface DataMenuUserActions {
    userActions: UserActionMenuUserActions[];
}

export interface UserActionMenuUserActions {
    group: string;
    children: ChildMenuUserActions[];
}

export interface ChildMenuUserActions {
    id: number;
    action: string;
    display: string;
    path: string;
    icon: string;
}

/* lang */
export type Applang = 'es' | 'en';

/* directions */
export type UiDirection = 'top' | 'end' | 'start' | 'bottom';

/* colorsTailwind */
export type ColorsTailwind = 'light' | 'dark' | 'default' | 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose' | null;

/* colors primary */
export type ColorsPrimary = 'success' | 'danger' | 'warning' | 'info' | 'muted' | 'light' | 'dark' | null | '';

/* btn toggle */
export type BtnToggle = 'offcanvas' | 'modal' | 'collapse' | null;

/* btn toggle */
export type UiSize = 'xs' | 'sm' | 'md' | 'xm' | 'lg' | 'xl' | 'normal' | null;

/* display value -> extend of DisplayLang */
export type DisplayValues = 'title' | 'description' | 'name' | 'label';

/* extend of DataBarUser */
export type PanelNameSection = 'setting' | 'audit' | 'clinic-history' | 'pharmacy' | 'tariff' | 'principal' | null;

/* btn aside */
export interface ActionsBtnsAside {
    action: string;
    label: string;
    icon: string;
};

/* btn steps */
export interface StepAction {
    action: string;
    label: string;
    text?: string;
};

/* menu tools bar */
export interface ToolBarActions {
    data: DataToolBarActions;
}

export interface DataToolBarActions {
    barActions: BarActionToolBarActions[];
}

export interface BarActionToolBarActions {
    id: number;
    action: string;
    icon: string;
    display: DisplayLang[];
}

/* menushortcut */
export interface ShortcutMenu {
    data: DataShortcutMenu;
}

export interface DataShortcutMenu {
    menuShortcut: MenuShortcutShortcutMenu[];
}

export interface MenuShortcutShortcutMenu {
    uuid: string;
    path: string;
    active?: boolean;
    icon: string;
    color: string;
    display: DisplayLang[];
}

/* bar tool */


/* bar user signin */
/**
 * @IMPORTANT!
 * update interface PanelNameSection
 * agregando un nuevo atributo a PanelNameSection
 */
export interface DataBarUser {
    section: PanelNameSection;
    current: string;
}


/* balde tabs */
export interface tabsControls {
    idConnect: string;
    label: string;
    active: boolean;
    icon?: string;
    sublabel?: string;
    disable?: boolean;
}

/* item list default */
export interface ItemListApp {
    uuid?: string;
    path?: string;
    action?: string;
    icon?: string;
    idConnect?: string;
    active?: boolean;
    label?: string;
    color?: string;
    display?: DisplayLang[];
}


/* tipo de return */
export type TypeReturn = 'options' | null;


/* output Data */
export interface OutputData {
    type: string;
    data?: any | null;
}

/* panel-action */
export type ActionName = keyof BarActions;
export interface BarActions {
    edit?: boolean;
    delete?: boolean;
    update?: boolean;
    add?: boolean;
    save?: boolean;
    cancel?: boolean;
    reset?: boolean;
    clean?: boolean;
    return?: boolean;
}

export interface ItemAction {
    action: ActionName;
    label: string;
    icon: string;
    color: string;
}

export type UiBoxpanel = 'clean' | 'default' | 'white' | 'gentle';

export type anyAPI = any;
export type anyAPP = any;
export type anyAPI_PAGE = any;
export type anyAPP_PAGE = any;

/* App config */
export type AppColor = 'default' | 'teal';
export type AppMode = 'dark' | 'light' | 'system';
export type AppMenu = 'menu-aside' | 'menu-icons' | 'menu-hide';
export type im_uiSize = 'xm' | 'sm' | 'base' | 'md' | 'lg' | 'xl';

export interface AppGisa {
    color: AppColor;
    mode: AppMode;
    menu: AppMenu;
}
