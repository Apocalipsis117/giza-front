import { Component, computed, inject, output, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { NameStateEntity_APP, NameStateEntity_PageAPP, onBtn } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { BtnsActionComponent } from '@layouts/dashboard/btns/btns-action/btns-table-action.component';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';
import { ManualInputMaterialsService } from '@services/api';

@Component({
    selector: 'table-manual-input-materials',
    imports: [
        BladeTableComponent,
        DirectivesModule,
        BtnsActionComponent,
        BadgeStatusComponent
    ],
    templateUrl: './table-manual-input-materials.component.html'
})
export class TableManualInputMaterialsComponent {
    public onTable = output<onBtn<NameStateEntity_APP>>();
    private CashReceiptConcept$ = inject(ManualInputMaterialsService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<NameStateEntity_PageAPP | null>(null);
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

    onBtn(data: onBtn<NameStateEntity_APP>) {
        this.tdSelected.set(data.value.id);
        this.onTable.emit(data);
    }
}
