import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { uiUtilities } from '@helpers/index';

@Component({
    selector: 'badge-status',
    standalone: true,
    imports: [NgClass],
    templateUrl: './badge-status.component.html'
})
export class BadgeStatusComponent {
    public setStatus = input<boolean>(false);

    status = computed(() => {
        const display = this.setStatus() ? 'Activo' : 'Inactivo';
        const color = this.setStatus() ? 'success' : 'danger';
        const theme = uiUtilities.colorsStatus.find(item => item.name === color)?.nameImp;
        return {
            display,
            theme
        };
    })
}
