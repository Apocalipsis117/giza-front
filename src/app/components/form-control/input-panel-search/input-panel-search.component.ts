import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'input-panel-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-panel-search.component.html'
})
export class InputPanelSearchComponent {
    setLabel = input<string>('Buscador');
}
