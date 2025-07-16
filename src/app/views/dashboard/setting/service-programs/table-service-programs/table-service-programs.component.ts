import { Component, computed, inject, output, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { onBtn, ServicePrograms_APP, ServicePrograms_PageAPP } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { BtnsActionComponent } from '@layouts/dashboard/btns/btns-action/btns-table-action.component';
import { ServiceProgramsService } from '@services/api';

@Component({
    selector: 'table-service-programs',
    imports: [
        BladeTableComponent,
        DirectivesModule,
        BtnsActionComponent
    ],
    templateUrl: './table-service-programs.component.html'
})
export class TableServiceProgramsComponent {
    public onTable = output<onBtn<ServicePrograms_APP>>();
    private ServicePrograms$ = inject(ServiceProgramsService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<ServicePrograms_PageAPP | null>(null);
    tdSelected = signal<number | string>(NaN);
    load = signal<boolean>(false);
    entities = computed(() => this.dataTable() ? this.dataTable()?.content : []);

    ngOnInit(): void {
        this.queryDataTable()
    }

    queryDataTable() {
        this.ServicePrograms$.page(this.paramPaginate()).subscribe({
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

    onBtn(data: onBtn<ServicePrograms_APP>) {
        this.tdSelected.set(data.value.id);
        this.onTable.emit(data);
    }
}
