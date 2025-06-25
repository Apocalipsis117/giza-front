import { Component, computed, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { BarActionsComponent } from '@layouts/dashboard/bars/bar-actions/bar-actions.component';
import { ActionName, BarActions, UiBoxpanel } from '@interfaces/index';

@Component({
    selector: 'blade-box-panel',
    standalone: true,
    imports: [
        NgClass,
        BarActionsComponent
    ],
    templateUrl: './blade-box-panel.component.html'
})
export class BladeBoxPanelComponent {
    public readonly actionBar = output<ActionName>();
    public actionsActive = input<boolean>(false);
    public setActionsBar = input<BarActions|null>(null);
    public setTitle = input<string>();
    public headerActive = input<boolean>(true);
    public setIcon = input<string>();
    public padding = input<boolean>(false);
    public ui = input<UiBoxpanel>('default');

    padd = computed(() => this.padding() ? 'w-full px-4 pt-3 pb-4' : '');

    uiBox = computed(() => {
        let uibox = 'ui-default';
        switch (this.ui()) {
            case 'clean':
                uibox = 'ui-clean';
                break;
            case 'white':
                uibox = 'ui-white';
                break;
            case 'gentle':
                uibox = 'ui-gentle';
                break;
        }
        return uibox
    });

    emitAction(action: ActionName) {
        this.actionBar.emit(action);
    }
}
