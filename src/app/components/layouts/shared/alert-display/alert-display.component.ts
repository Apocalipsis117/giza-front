import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'alert-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-display.component.html'
})
export class AlertDisplayComponent {
    public hidden = input<boolean>(false);
    public readonly changehidden = output<boolean>();

    change(){
        this.changehidden.emit(false);
    }
}
