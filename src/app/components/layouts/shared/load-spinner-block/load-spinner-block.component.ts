import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'load-spinner-block',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './load-spinner-block.component.html'
})
export class LoadSpinnerBlockComponent {
    @Input() load: boolean = false;
    @Input() label: string = '';
    @Input() height: number | string = 'auto';

    get propertyHeight() {
        return this.height === 'auto' ? 'auto' : this.height;
    }
}
