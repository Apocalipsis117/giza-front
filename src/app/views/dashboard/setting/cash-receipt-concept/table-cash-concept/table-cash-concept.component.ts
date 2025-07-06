import { Component, computed, inject, output, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { NameIdEntity_APP, NameIdEntity_PageAPP, onBtn } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { BtnsActionComponent } from '@layouts/dashboard/btns/btns-action/btns-table-action.component';
import { CashReceiptConceptService } from 'src/app/core/services/api/setting/cash-receipt-concept.service';

@Component({
    selector: 'table-cash-concept',
    standalone: true,
    imports: [
        BladeTableComponent,
        DirectivesModule,
        BtnsActionComponent
    ],
    templateUrl: './table-cash-concept.component.html'
})
export class TableCashConceptComponent {
    public onTable = output<onBtn<NameIdEntity_APP>>();
    private CashReceiptConcept$ = inject(CashReceiptConceptService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<NameIdEntity_PageAPP | null>(null);
    tdSelected = signal<number | string>(NaN);
    load = signal<boolean>(false);
    entities = computed(() => this.dataTable() ? this.dataTable()?.content : []);

    ngOnInit(): void {
        this.queryDataTable()
    }

    queryDataTable() {
        this.CashReceiptConcept$.page(this.paramPaginate()).subscribe({
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

    onBtn(data: onBtn<NameIdEntity_APP>) {
        this.tdSelected.set(data.value.id);
        this.onTable.emit(data);
    }
}
