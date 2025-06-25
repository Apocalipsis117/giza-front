import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPanelSearchComponent } from '@form-control/input-panel-search/input-panel-search.component';
import { FormDriverComponent } from '@layouts/dashboard/forms/form-driver/form-driver.component';

@Component({
  selector: 'panel-drivers',
  standalone: true,
  imports: [CommonModule, InputPanelSearchComponent, FormDriverComponent],
  templateUrl: './panel-drivers.component.html'
})
export class PanelDriversComponent {

}
