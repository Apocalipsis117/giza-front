import { Component, computed, inject, output, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { onBtn, RipConcept_APP, RipConcept_PageAPP } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { BtnsActionComponent } from '@layouts/dashboard/btns/btns-action/btns-table-action.component';
import { RipConceptService } from '@services/api';

@Component({
    selector: 'table-ripconcept',
    standalone: true,
    imports: [
        BladeTableComponent,
        DirectivesModule,
        BtnsActionComponent
    ],
    templateUrl: './table-ripconcept.component.html'
})
export class TableRipconceptComponent {
    public onTable = output<onBtn<RipConcept_APP>>();
    private RipConcept$ = inject(RipConceptService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<RipConcept_PageAPP | null>(null);
    tdSelected = signal<number | string>(NaN);
    load = signal<boolean>(false);
    entities = computed(() => this.dataTable() ? this.dataTable()?.content : []);

    ngOnInit(): void {
        this.queryVehicleList()
    }

    queryVehicleList() {
        this.RipConcept$.page(this.paramPaginate()).subscribe({
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

    onBtn(data: onBtn<RipConcept_APP>) {
        this.tdSelected.set(data.value.id);
        this.onTable.emit(data);
    }
}
