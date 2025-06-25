import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { ActionName, BarActions, ColorsTailwind } from '@interfaces/index';
import { BarActionsComponent } from '@layouts/dashboard/bars/bar-actions/bar-actions.component';

@Component({
    selector: 'blade-box-title',
    standalone: true,
    imports: [
        NgClass,
        BarActionsComponent
    ],
    templateUrl: './blade-box-title.component.html'
})
export class BladeBoxTitleComponent {
    public readonly onActionBar = output<ActionName>();
    public setTitle = input<string>('');
    public padding = input<boolean>(true);
    public activeShadow = input<boolean>(true);
    public hideHeader = input<boolean>(true);
    public enableActions = input<BarActions>({
        add: true,
        reset: true
    });
    public theme = input<'default' | 'light' | 'gentle'>('default');
    public ui = input<'default' | 'flat' | 'clean' | 'border'>('default');

    paddTop = computed(() => {
        const hasTitle = this.setTitle() ? 'pt-5 pb-4' : 'py-4';
        return this.padding() ? `px-4 ${hasTitle}` : hasTitle;
    });

    margTop = computed(() => this.setTitle() ? 'mt-4' : '');

    uiBox = computed(() => `ui-${this.ui()}`);

    shadow = computed(() => this.activeShadow() ? 'shadow-md' : '');

    themeBox = computed(() => `theme-${this.theme()}`);

    emitAction(action: ActionName) {
        this.onActionBar.emit(action);
    }
}
