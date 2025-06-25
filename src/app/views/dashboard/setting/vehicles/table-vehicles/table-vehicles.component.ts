import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { VehicleAPP } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'table-vehicles',
    standalone: true,
    templateUrl: './table-vehicles.component.html',
    imports: [
        CommonModule,
        BladeTableComponent,
        BadgeStatusComponent,
        ButtonComponent
    ]
})
export class TableVehiclesComponent {
    vehicles = input<VehicleAPP[]>([]);

    load = computed(() => this.vehicles().length > 0);
}
