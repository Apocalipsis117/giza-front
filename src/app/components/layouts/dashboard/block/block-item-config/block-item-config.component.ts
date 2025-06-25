import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'block-item-config',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './block-item-config.component.html'
})
export class BlockItemConfigComponent {
    public setIcon = input<string>('');
    public setTitle = input<string>('');
    public setSubtitle = input<string>('');
}
