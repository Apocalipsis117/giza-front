import { domHelper } from "./domHelper";

export const bsHelper = {
    collapseAction(el: HTMLElement | string, setOptions: BsOptionsCollapse | null = null) {
        const options: BsOptionsCollapse = {
            action: 'show',
            toggle: false,
            ...setOptions
        }
        const element = domHelper.isElement(el);
        let bsCollapse = new bootstrap.Collapse(element, {
            toggle: options.toggle ? options.toggle : false
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
    }
}

export interface BsOptionsCollapse {
    action?: 'show' | 'hide' | 'toggle';
    toggle?: boolean;
}

export interface BsOptionsTab {
    action?: 'show' | 'enabled' | 'disabled';
}