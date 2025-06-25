import { NgClass } from '@angular/common';
import { Component, Input, computed, input } from '@angular/core';
import { uiUtilities } from '@helpers/index';
import { ColorsPrimary } from '@interfaces/index';

@Component({
    selector: 'badge-status-text',
    standalone: true,
    imports: [NgClass],
    templateUrl: './badge-status-text.component.html'
})
export class BadgeStatusTextComponent {
    public setStatus = input<ColorsPrimary>('');

    status = computed(() => {
        const status = this.setStatus() ? uiUtilities.colorsStatus.find(color => color.name === this.setStatus()) : null;
        const label = status ? status.display.find(lang => lang.lang === 'es')?.labelActive : '';
        return {
            color: status ? status.nameImp : '',
            label
        }
    })
}
