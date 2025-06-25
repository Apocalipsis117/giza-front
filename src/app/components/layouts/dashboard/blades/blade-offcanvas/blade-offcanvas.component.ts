import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { UiDirection } from '@interfaces/index';

@Component({
    selector: 'blade-offcanvas',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './blade-offcanvas.component.html'
})
export class BladeOffcanvasComponent {
    public idConnect = input<string>('');
    public setWidth = input<string>('');
    public setTitle = input<string>('Titulo');
    public direction = input<UiDirection>('end');

    offcanvaDirection = computed(() => {
        return `offcanvas-${this.direction()}`;
    });
}
