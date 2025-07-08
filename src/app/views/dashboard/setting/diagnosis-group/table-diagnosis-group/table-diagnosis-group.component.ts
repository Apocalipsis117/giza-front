import { Component, computed, inject, signal } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { DiagnosisGroupService } from 'src/app/core/services/api/setting/diagnosis-group.service';
import { DiagnosisGroup_APP, DiagnosisGroup_PageAPP } from '@interfaces/index';
import { queries } from '@helpers/index';
import { LocalDiagnosisGroupService } from '../local-diagnosis-group.service';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { DirectivesModule } from '@directive/module';

@Component({
    selector: 'table-diagnosis-group',
    standalone: true,
    imports: [
        BladeTableComponent,
        ButtonComponent,
        DirectivesModule
    ],
    templateUrl: './table-diagnosis-group.component.html'
})
export class TableDiagnosisGroupComponent {
    private readonly DiagnosisGroup$ = inject(DiagnosisGroupService);
    private readonly local$ = inject(LocalDiagnosisGroupService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<DiagnosisGroup_PageAPP | null>(null);
    tdSelected = signal<number>(-1);
    load = signal<boolean>(false);

    entities = computed(() => this.dataTable() ? this.dataTable()?.content : []);

    ngOnInit(): void {
        this.queryAdministrativeEntities()
    }

    queryAdministrativeEntities() {
        this.load.set(true);
        this.DiagnosisGroup$.page(this.paramPaginate()).subscribe({
            next: (value) => {
                this.dataTable.set(value)
                this.load.set(false);
            }
        })
    }

    emit(item: DiagnosisGroup_APP) {
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
