import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'badge-status',
    standalone: true,
    templateUrl: './badge-status.component.html'
})
export class BadgeStatusComponent {
    public setStatus = input<boolean>(false);

    status = computed(() => {
        const color = {
            disable: {
                theme: 'bg-gray-300',
                color: 'text-gray-700'
            },
            enable: {
                theme: 'bg-green-400',
                color: 'text-green-500'
            }
        }
        const display = this.setStatus() ? 'Activo' : 'Inactivo';
        const theme = this.setStatus() ? color['enable'] : color['disable'];
        return {
            display,
            theme: theme.theme,
            color: theme.color
        };
    })
}
