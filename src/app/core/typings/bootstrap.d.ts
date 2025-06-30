export {};
declare global {
    interface Bootstrap {
        Collapse: new (element: HTMLElement, options?: BsCollapseOptions) => BsCollapseInstance;
        Tab: new (element: HTMLElement) => BsTapInstance;
        Modal: {
            new(element: HTMLElement, options?: BsModalOptions): BsModalInstance;
            getInstance: (element: HTMLElement) => BsModalInstance | null;
        };
        Alert: new (element: HTMLElement, options?: BsAlertOptions) => BsAlertInstance;
        Breadcrumb: new (element: HTMLElement, options?: BsBreadcrumbOptions) => BsBreadcrumbInstance;
        Dropdown: {
            new(element: HTMLElement, toggleOptions?: BsDropdownToggleOptions, menuOptions?: BsDropdownMenuOptions, options?: BsDropdownOptions): BsDropdownInstance;
            getInstance: (element: HTMLElement) => BsDropdownInstance | null;
        };
        Offcanvas: {
            new(element: HTMLElement, options?: BsOffcanvasOptions): BsOffcanvasInstance;
            getInstance: (element: HTMLElement) => BsOffcanvasInstance | null;
        };
    }

    const bootstrap: Bootstrap;
}


// collapse

export interface BsCollapseOptions {
    toggle: boolean;
}

export interface BsCollapseInstance {
    show: () => void;
    hide: () => void;
    toggle: () => void;
}

// tab

export interface BsTapInstance {
    show: () => void;
    disabled: boolean;
}

// modal

export interface BsModalOptions {
    backdrop?: boolean | 'static';
    keyboard?: boolean;
    focus?: boolean;
}

export interface BsModalInstance {
    show: () => void;
    hide: () => void;
    toggle?: () => void;
}


// dropdown

export interface BsDropdownToggleOptions {
    id?: string;
}

export interface BsDropdownMenuOptions {
    id?: string;
}

export interface BsDropdownOptions {
    boundary?: HTMLElement | string;
    boundaryAlign?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export interface BsDropdownInstance {
    toggle: () => void;
}


// Breadcrumb

export interface BsBreadcrumbItem {
    href?: string;
    active?: boolean;
}

export interface BsBreadcrumbOptions {
    items?: BsBreadcrumbItem[];
}

export interface BsBreadcrumbInstance {
    addItem: (item: BsBreadcrumbItem) => void;
    removeItem: (index: number) => void;
}

// alerts

export interface BsAlertOptions {
    dismissible?: boolean;
    fade?: boolean;
}

export interface BsAlertInstance {
    close: () => void;
    dismiss: () => void;
}

// offcanvas

export interface BsOptionsOffcanvas {
    action?: 'show' | 'hide' | 'toggle';
    backdrop?: boolean;
    keyboard?: boolean;
    scroll?: boolean;
}

export interface BsOffcanvasOptions {
    backdrop?: boolean;
    keyboard?: boolean;
    scroll?: boolean;
}

export interface BsOffcanvasInstance {
    show: () => void;
    hide: () => void;
    toggle: () => void;
}