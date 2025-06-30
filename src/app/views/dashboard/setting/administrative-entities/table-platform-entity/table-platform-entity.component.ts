import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { AdministrativeEntity_APP, AdministrativeEntity_PageAPP } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { SwitchStatusComponent } from '@layouts/shared/switch-status/switch-status.component';
import { AdministrativeEntitiesService } from '@services/api';
import { LocalAdministrativeEntitiesService } from '../local-administrative-entities.service';

@Component({
    selector: 'table-platform-entity',
    standalone: true,
    imports: [
        CommonModule,
        BladeTableComponent,
        ButtonComponent,
        SwitchStatusComponent,
        DirectivesModule
    ],
    templateUrl: './table-platform-entity.component.html'
})
export class TablePlatformEntityComponent {
    private readonly adminEntities$ = inject(AdministrativeEntitiesService);
    private readonly local$ = inject(LocalAdministrativeEntitiesService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<AdministrativeEntity_PageAPP | null>(null);
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

    emit(item: AdministrativeEntity_APP) {
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
