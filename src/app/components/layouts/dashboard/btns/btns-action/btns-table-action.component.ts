import { Component, computed, input, output } from '@angular/core';
import { ActionNameBtns, BtnAction, BtnsActions, onBtn } from '@interfaces/index';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'btns-action',
    imports: [
        ButtonComponent
    ],
    templateUrl: './btns-table-action.component.html'
})
export class BtnsActionComponent {
    public onBtn = output<onBtn<any>>();
    public data = input<any | null>(null);
    public enableActions = input<BtnsActions | null>(null);
    actionsDefault: BtnsActions = {
        read: true
    }
    actionsDisabled: BtnsActions = {
        read: false,
        edit: false,
        delete: false
    }
    actions: BtnAction[] = [
        {
            action: 'read',
            icon: 'icofont-info-circle',
            color: 'default'
        },
        {
            action: 'edit',
            color: 'teal',
            icon: 'icofont-ui-edit'
        },
        {
            action: 'delete',
            color: 'red',
            icon: 'icofont-bin '
        },
    ];

    listActions = computed(() => {
        const def: BtnsActions = {
            ...this.actionsDisabled,
            ...this.actionsDefault,
        }
        const custom = {
            ...this.actionsDisabled,
            ...this.enableActions()
        }
        const actions = this.enableActions() ? custom : def;
        return this.actions.filter(action => actions[action.action]);
    })

    emitAction(action: ActionNameBtns) {
        this.onBtn.emit({
            action,
            value: this.data()
        });
    }

}
