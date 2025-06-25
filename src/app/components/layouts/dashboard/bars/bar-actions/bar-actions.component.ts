import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { ActionName, ItemAction, BarActions } from '@interfaces/index';

@Component({
    selector: 'bar-actions',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './bar-actions.component.html'
})
export class BarActionsComponent {
    public readonly actionBar = output<ActionName>();
    public enableActions = input<BarActions | null>(null);
    actionsDefault: BarActions = {
        save: true,
        reset: true
    }
    actionsDisabled: BarActions = {
        edit: false,
        delete: false,
        add: false,
        save: false,
        cancel: false,
        reset: false
    }
    actions: ItemAction[] = [
        {
            action: 'add',
            label: 'Agregar',
            icon: 'icofont-plus',
            color: 'theme-teal'
        },
        {
            action: 'save',
            label: 'Guardar',
            icon: 'icofont-save',
            color: 'theme-teal'
        },
        {
            action: 'edit',
            label: 'Editar',
            icon: 'icofont-edit',
            color: 'theme-cyan'
        },
        {
            action: 'cancel',
            label: 'Cancelar',
            icon: 'icofont-ui-close',
            color: ''
        },
        {
            action: 'reset',
            label: 'Resetear',
            icon: 'icofont-spinner-alt-3',
            color: ''
        },
        {
            action: 'clean',
            label: 'Limpiar',
            icon: 'icofont-exit',
            color: ''
        },
        {
            action: 'delete',
            label: 'Eliminar',
            icon: 'icofont-bin',
            color: 'theme-red'
        }
    ];

    listActions = computed(() => {
        const def: BarActions = {
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

    emitAction(action: ActionName) {
        this.actionBar.emit(action);
    }
}
