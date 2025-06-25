import { Component, input } from '@angular/core';

@Component({
  selector: 'switch-status',
  standalone: true,
  imports: [],
  templateUrl: './switch-status.component.html'
})
export class SwitchStatusComponent {
    active = input<boolean>(false)
}
