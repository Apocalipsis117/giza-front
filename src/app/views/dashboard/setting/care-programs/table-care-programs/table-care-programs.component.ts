import { Component, computed, inject, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { CarePrograms_APP, CarePrograms_PageAPP } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { CareProgramsService } from '@services/api';
import { LocalCareProgramsService } from '../local-care-programs.service';

@Component({
    selector: 'table-care-programs',
    standalone: true,
    imports: [
        BladeTableComponent,
        ButtonComponent,
        DirectivesModule
    ],
    templateUrl: './table-care-programs.component.html'
})
export class TableCareProgramsComponent {
    private readonly adminEntities$ = inject(CareProgramsService);
    private readonly local$ = inject(LocalCareProgramsService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<CarePrograms_PageAPP | null>(null);
    tdSelected = signal<number>(-1);
    load = signal<boolean>(false);

    entities = computed(() => this.dataTable() ? this.dataTable()?.content : []);

    ngOnInit(): void {
        this.queryAdministrativeEntities()
    }

    queryAdministrativeEntities() {
        this.load.set(true);
        this.adminEntities$.page(this.paramPaginate()).subscribe({
            next: (value) => {
                this.dataTable.set(value)
                this.load.set(false);
            }
        })
    }

    emit(item: CarePrograms_APP) {
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
