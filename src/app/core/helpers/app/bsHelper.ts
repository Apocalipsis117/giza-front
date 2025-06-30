import { domHelper } from "@helpers/index";

export const bsHelper = {
    collapseAction(el: HTMLElement | string, setOptions: BsOptionsCollapse | null = null) {
        const options: BsOptionsCollapse = {
            action: 'show',
            toggle: false,
            ...setOptions
        }
        const element = domHelper.isElement(el);
        if(!element) return;
        let bsCollapse = new bootstrap.Collapse(element, {
            toggle: options.toggle || false
        })
        switch(options.action) {
        case 'show':
            bsCollapse.show()
            break;
        case 'hide':
            bsCollapse.hide()
            break;
        case 'toggle':
            bsCollapse.toggle()
            break;
        }
    },
    tabAction(el: HTMLElement | string, setOptions: BsOptionsTab | null = null) {
        const options: BsOptionsTab = {
            action: 'show',
            ...setOptions
        }
        const element = domHelper.isElement(el);
        if(!element) return;
        const tab = new bootstrap.Tab(element);
        switch(options.action) {
        case 'show':
            tab.show()
            break;
        case 'enabled':
        case 'disabled':
            tab.disabled = options.action === 'enabled';
            break;
        }
    },
    dialogAction(el: string | HTMLElement, setOptions: BsOptionsDialog | null = null) {
        const options: BsOptionsDialog = {
            action: 'show',
            ...setOptions
        }
        const element = domHelper.isElement(el);
        if(!element) return;
        let modal;
        switch(options.action) {
        case 'show':
            modal = new bootstrap.Modal(element);
            modal?.show();
            break;
        case 'hide':
            modal = bootstrap.Modal.getInstance(element);
            modal?.hide();
            break;
        }
    },
    offcanvasAction(el: HTMLElement | string, setOptions: BsOptionsOffcanvas | null = null) {
        const options: BsOptionsOffcanvas = {
            action: 'show',
            ...setOptions
        };

        const element = domHelper.isElement(el);
        if (!element) return;
        const offcanvas = bootstrap.Offcanvas.getInstance(element) || new bootstrap.Offcanvas(element, options);

        switch (options.action) {
            case 'show':
                offcanvas.show();
                break;
            case 'hide':
                offcanvas.hide();
                break;
            case 'toggle':
                offcanvas.toggle();
                break;
            default:
                console.warn('Acción no reconocida:', options.action);
                break;
        }
    },
}

export interface BsOptionsDialog {
    action?: 'show' | 'hide' | 'toggle';
}

export interface BsOptionsCollapse {
    action?: 'show' | 'hide' | 'toggle';
    toggle?: boolean;
}

export interface BsOptionsTab {
    action?: 'show' | 'enabled' | 'disabled';
}
export interface BsOptionsOffcanvas {
    action?: 'show' | 'hide' | 'toggle';
    backdrop?: boolean;
    keyboard?: boolean;
    scroll?: boolean;
}