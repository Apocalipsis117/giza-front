import { Component, computed, inject, output, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { CostCenter_APP, CostCenter_PageAPP, onBtn, Vehicle_APP } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { BtnsActionComponent } from '@layouts/dashboard/btns/btns-action/btns-table-action.component';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';
import { CostCenterService } from '@services/api';

@Component({
    selector: 'table-cost-center',
    standalone: true,
    imports: [
        BladeTableComponent,
        BadgeStatusComponent,
        DirectivesModule,
        BtnsActionComponent
    ],
    templateUrl: './table-cost-center.component.html'
})
export class TableCostCenterComponent {

    public onTable = output<onBtn<CostCenter_APP>>();
    private CostCenter$ = inject(CostCenterService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<CostCenter_PageAPP | null>(null);
    tdSelected = signal<number | string>(NaN);
    load = signal<boolean>(false);
    entities = computed(() => this.dataTable() ? this.dataTable()?.content : []);

    ngOnInit(): void {
        this.queryVehicleList()
    }

    queryVehicleList() {
        this.CostCenter$.page(this.paramPaginate()).subscribe({
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
        this.queryVehicleList();
    }

    onBtn(data: onBtn<CostCenter_APP>) {
        this.tdSelected.set(data.value.id);
        this.onTable.emit(data);
    }
}
