import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';

@Component({
    selector: 'table-tariff',
    standalone: true,
    imports: [CommonModule, BladeTableComponent, InputPanelSelectComponent],
    templateUrl: './table-tariff.component.html'
})
export class TableTariffComponent {

}
