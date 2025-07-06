import { Component, computed, inject, output, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { onBtn, Vehicle_APP, Vehicle_PageAPP } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { BtnsActionComponent } from '@layouts/dashboard/btns/btns-action/btns-table-action.component';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';
import { VehicleService } from '@services/api';

@Component({
    selector: 'table-vehicles',
    standalone: true,
    templateUrl: './table-vehicles.component.html',
    imports: [
        BladeTableComponent,
        BadgeStatusComponent,
        DirectivesModule,
        BtnsActionComponent
    ]
})
export class TableVehiclesComponent {
    public onTable = output<onBtn<Vehicle_APP>>();
    private vehicle$ = inject(VehicleService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<Vehicle_PageAPP | null>(null);
    tdSelected = signal<number | string>(NaN);
    load = signal<boolean>(false);
    entities = computed(() => this.dataTable() ? this.dataTable()?.content : []);

    ngOnInit(): void {
        this.queryDataTable()
    }

    queryDataTable() {
        this.vehicle$.page(this.paramPaginate()).subscribe({
            next: (value) => {
                this.dataTable.set(value);
                this.load.set(false);
            }
        })
    }

    clean() {
        this.tdSelected.set(-1);
    }

    paginate(e: any) {
        this.paramPaginate.set(e);
        this.queryDataTable();
    }

    onBtn(data: onBtn<Vehicle_APP>) {
        this.tdSelected.set(data.value.uuid);
        this.onTable.emit(data);
    }
}
