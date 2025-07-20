import { Component, computed, inject, output, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { LegalInformation_APP, LegalInformation_PageAPP, onBtn } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { BtnsActionComponent } from '@layouts/dashboard/btns/btns-action/btns-table-action.component';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';
import { LegalInformationService } from '@services/api';

@Component({
    selector: 'table-legal-information',
    imports: [
        BladeTableComponent,
        BadgeStatusComponent,
        DirectivesModule,
        BtnsActionComponent
    ],
    templateUrl: './table-legal-information.component.html'
})
export class TableLegalInformationComponent {
    public onTable = output<onBtn<LegalInformation_APP>>();
    private LegalInformation$ = inject(LegalInformationService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<LegalInformation_PageAPP | null>(null);
    tdSelected = signal<number | string>(NaN);
    load = signal<boolean>(false);
    entities = computed(() => this.dataTable() ? this.dataTable()?.content : []);

    ngOnInit(): void {
        this.queryDataTable();
    }

    queryDataTable() {
        this.LegalInformation$.page(this.paramPaginate()).subscribe({
            next: (value) => {
                this.dataTable.set(value);
                this.load.set(false);
            }
        });
    }

    clean() {
        this.tdSelected.set(-1);
    }

    paginate(e: any) {
        this.paramPaginate.set(e);
        this.queryDataTable();
    }

    onBtn(data: onBtn<LegalInformation_APP>) {
        this.tdSelected.set(data.value.uuid);
        this.onTable.emit(data);
    }
}
