import { Component, computed, inject, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { Diagnosis_APP, Diagnosis_PageAPP } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { PipesModule } from '@pipes/module';
import { DiagnosisService } from '@services/api';
import { LocalDiagnosisService } from '../local-diagnosis.service';

@Component({
    selector: 'table-diagnosis',
    standalone: true,
    imports: [
        BladeTableComponent,
        ButtonComponent,
        DirectivesModule,
        PipesModule
    ],
    templateUrl: './table-diagnosis.component.html'
})
export class TableDiagnosisComponent {
    private readonly diagnosis$ = inject(DiagnosisService);
    private readonly local$ = inject(LocalDiagnosisService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<Diagnosis_PageAPP | null>(null);
    tdSelected = signal<number>(-1);
    load = signal<boolean>(false);

    entities = computed(() => this.dataTable() ? this.dataTable()?.content.map(x => ({
        id: x.id,
        name: x.name,
        code: x.code,
        gender: x.gender?.name || '',
        minAge: x.minAge,
        maxAge: x.maxAge,
        active: x.active,
        entity: x
    })) : []);

    ngOnInit(): void {
        this.queryAdministrativeEntities()
    }

    queryAdministrativeEntities() {
        this.load.set(true);
        this.diagnosis$.page(this.paramPaginate()).subscribe({
            next: (value) => {
                this.dataTable.set(value)
                this.load.set(false);
            }
        })
    }

    emit(item: Diagnosis_APP) {
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
