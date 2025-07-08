import { Component, computed, inject, signal } from '@angular/core';
import { InputMaterialsService } from 'src/app/core/services/api/setting/input-materials.service';
import { LocalInputMaterialsService } from '../local-input-materials.service';
import { queries } from '@helpers/index';
import { InputMaterials_APP, InputMaterials_PageAPP } from '@interfaces/index';
import { DirectivesModule } from '@directive/module';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';

@Component({
    selector: 'table-input-materials',
    imports: [
        BladeTableComponent,
        ButtonComponent,
        DirectivesModule,
        BadgeStatusComponent
    ],
    templateUrl: './table-input-materials.component.html'
})
export class TableInputMaterialsComponent {
    private readonly InputMaterials$ = inject(InputMaterialsService);
    private readonly local$ = inject(LocalInputMaterialsService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<InputMaterials_PageAPP | null>(null);
    tdSelected = signal<number>(-1);
    load = signal<boolean>(false);

    entities = computed(() => this.dataTable() ? this.dataTable()?.content : []);

    ngOnInit(): void {
        this.QueryInstitutions()
    }

    QueryInstitutions() {
        this.load.set(true);
        this.InputMaterials$.page(this.paramPaginate()).subscribe({
            next: (value) => {
                this.dataTable.set(value)
                this.load.set(false);
            }
        })
    }

    emit(item: InputMaterials_APP) {
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
