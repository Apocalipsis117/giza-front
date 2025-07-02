import { Component, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'block-switch-status',
    standalone: true,
    templateUrl: './block-switch-status.component.html',
    imports: [
        FormsModule
    ]
})
export class BlockSwitchStatusComponent {
    active = input<boolean>(false);

    check = computed(() => {
        const check = {
            ok: {
                color: 'text-green-500',
                icon: 'icofont-check-circled',
                label: 'Activo'
            },
            none: {
                color: 'text-gray-300',
                icon: 'icofont-close-circled',
                label: 'Inactivo'
            }
        }
        return this.active() ? check['ok'] : check['none'];
    })
}
