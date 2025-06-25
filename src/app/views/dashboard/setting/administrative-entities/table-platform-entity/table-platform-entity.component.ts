import { Component, computed, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { AdministrativeEntitiesAPP_PAGE, AdministrativeEntityAPP } from '@interfaces/app';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { SwitchStatusComponent } from '@layouts/shared/switch-status/switch-status.component';
import { LocalAdministrativeEntitiesService } from '../local-administrative-entities.service';
import { DirectivesModule } from '@directive/module';

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
    private readonly local$ = inject(LocalAdministrativeEntitiesService);
    public readonly paginate = output<any>();
    public dataTable = input<AdministrativeEntitiesAPP_PAGE | null>();
    tdSelected = signal<number>(-1);

    entities = computed(() => this.dataTable() ? this.dataTable()?.content : []);
    entitiesCant = computed(() => this.dataTable() ? this.dataTable()!.content.length > 0 : false);

    emit(item: AdministrativeEntityAPP) {
        this.tdSelected.set(item.id);
        this.local$.entityEmit(item);
    }

    clean() {
        this.tdSelected.set(-1);
        this.local$.entityEmit(null);
    }
}
