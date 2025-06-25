import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'load-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './load-spinner.component.html'
})
export class LoadSpinnerComponent {
    @Input() load: boolean = false;
}
