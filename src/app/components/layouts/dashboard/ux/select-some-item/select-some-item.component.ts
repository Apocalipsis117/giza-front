import { Component, input } from '@angular/core';

@Component({
  selector: 'select-some-item',
  standalone: true,
  imports: [],
  templateUrl: './select-some-item.component.html'
})
export class SelectSomeItemComponent {
    public setSubtitle = input<string>('Seleciona un elemento');
}
