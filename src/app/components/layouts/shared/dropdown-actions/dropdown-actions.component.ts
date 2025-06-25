import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { swalMessage, swalOptions } from '@helpers/index';
import Swal from 'sweetalert2';


@Component({
    selector: 'dropdown-actions',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dropdown-actions.component.html'
})
export class DropdownActionsComponent {
    @Output() action = new EventEmitter<string>();
    actions = [
        {
            id: 1,
            color: '',
            action: 'edit',
            display: 'Editar',
            icon: 'icofont-ui-edit'
        },
        {
            id: 2,
            color: 'text-red-400',
            action: 'delete',
            display: 'Eliminar',
            icon: 'icofont-trash'
        }
    ]
    emitAction(id: number) {
        let action = this.actions.find(action => action.id === id);
        if (action?.action === 'delete') {
            Swal.fire(swalOptions.confirmAction(swalMessage.deleteItemAction)).then(r => {
                if (r.isConfirmed) {
                    this.action.emit(action?.action)
                }
            })
        } else {
            this.action.emit(action?.action)
        }
    }
}
