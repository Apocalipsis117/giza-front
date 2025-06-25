import { Component, input } from '@angular/core';
import { TitleIconSectionComponent } from '@layouts/shared/title-icon-section/title-icon-section.component';

@Component({
    selector: 'blade-box-ui',
    standalone: true,
    imports: [
        TitleIconSectionComponent
    ],
    templateUrl: './blade-box-ui.component.html'
})
export class BladeBoxUiComponent {
    public title = input<string>('', { alias: 'setTitle' });
    public icon = input<string>('', { alias: 'setIcon' });
}
