import { Component, computed, inject, output, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { onBtn, ProcedurePyp_APP, ProcedurePyp_PageAPP } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { BtnsActionComponent } from '@layouts/dashboard/btns/btns-action/btns-table-action.component';
import { ProcedurePypService } from 'src/app/core/services/api/setting/procedure-pyp.service';

@Component({
    selector: 'table-procedure-pyp',
    imports: [
        BladeTableComponent,
        DirectivesModule,
        BtnsActionComponent
    ],
    templateUrl: './table-procedure-pyp.component.html'
})
export class TableProcedurePypComponent {
    public onTable = output<onBtn<ProcedurePyp_APP>>();
    private vehicle$ = inject(ProcedurePypService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<ProcedurePyp_PageAPP | null>(null);
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

    onBtn(data: onBtn<ProcedurePyp_APP>) {
        this.tdSelected.set(data.value.id);
        this.onTable.emit(data);
    }
}
