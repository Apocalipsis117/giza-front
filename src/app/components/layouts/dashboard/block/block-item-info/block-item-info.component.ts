import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'block-item-info',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './block-item-info.component.html'
})
export class BlockItemInfoComponent {
    public setLabel = input<string>('');
    public setIcon = input<string>('');
    public setText = input<string | number | boolean>('');
}
