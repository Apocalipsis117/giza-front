import { Component, computed, inject, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { Medicine_APP, Medicine_PageAPP } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { PipesModule } from '@pipes/module';
import { MedicineService } from '@services/api';
import { LocalMedicineService } from '../local-medicine.service';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';

@Component({
    selector: 'table-medicine',
    standalone: true,
    imports: [
        BladeTableComponent,
        BadgeStatusComponent,
        ButtonComponent,
        DirectivesModule,
        PipesModule
    ],
    templateUrl: './table-medicine.component.html'
})
export class TableMedicineComponent {
    private readonly Medicine$ = inject(MedicineService);
    private readonly local$ = inject(LocalMedicineService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<Medicine_PageAPP | null>(null);
    tdSelected = signal<number>(-1);
    load = signal<boolean>(false);

    entities = computed(() => this.dataTable() ? this.dataTable()?.content : []);

    ngOnInit(): void {
        this.queryAdministrativeEntities()
    }

    queryAdministrativeEntities() {
        this.load.set(true);
        this.Medicine$.page(this.paramPaginate()).subscribe({
            next: (value) => {
                this.dataTable.set(value)
                this.load.set(false);
            }
        })
    }

    emit(item: Medicine_APP) {
        this.tdSelected.set(item.id);
        this.local$.entityEmit(item);
    }

    clean() {
        this.tdSelected.set(-1);
        this.local$.entityEmit(null);
    }

    paginate(e: any) {
        this.paramPaginate.set(e);
        this.queryAdministrativeEntities();
    }
}
