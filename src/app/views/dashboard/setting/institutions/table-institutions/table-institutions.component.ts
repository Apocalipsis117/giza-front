import { Component, computed, inject, signal } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { InstitutionsService } from '@services/api';
import { LocalInstitutionsService } from '../local-institutions.service';
import { queries } from '@helpers/index';
import { Institutions_APP, Institutions_PageAPP } from '@interfaces/index';
import { DirectivesModule } from '@directive/module';

@Component({
    selector: 'table-institutions',
    standalone: true,
    imports: [
        BladeTableComponent,
        ButtonComponent,
        DirectivesModule
    ],
    templateUrl: './table-institutions.component.html'
})
export class TableInstitutionsComponent {
    private readonly institutions$ = inject(InstitutionsService);
    private readonly local$ = inject(LocalInstitutionsService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<Institutions_PageAPP | null>(null);
    tdSelected = signal<number>(-1);
    load = signal<boolean>(false);

    entities = computed(() => this.dataTable() ? this.dataTable()?.content : []);

    ngOnInit(): void {
        this.QueryInstitutions()
    }

    QueryInstitutions() {
        this.load.set(true);
        this.institutions$.page(this.paramPaginate()).subscribe({
            next: (value) => {
                this.dataTable.set(value)
                this.load.set(false);
            }
        })
    }

    emit(item: Institutions_APP) {
        this.tdSelected.set(item.id);
        this.local$.entityEmit(item);
    }

    clean() {
        this.tdSelected.set(-1);
        this.local$.entityEmit(null);
    }

    paginate(e: any) {
        this.paramPaginate.set(e);
        this.QueryInstitutions();
    }
}
