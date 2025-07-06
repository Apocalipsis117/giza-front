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
                textColor: '',
                icon: 'icofont-check-circled',
                label: 'Activo',
                font: 'font-semibold'
            },
            none: {
                color: 'text-gray-300',
                textColor: 'text-gray-400',
                icon: 'icofont-close-circled',
                label: 'Inactivo',
                font: ''
            }
        }
        return this.active() ? check['ok'] : check['none'];
    })
}
