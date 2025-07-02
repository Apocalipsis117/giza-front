import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { OxygenRate_APP, OxygenRate_PageAPP } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { OxygenRateService } from '@services/api';
import { LocalOxygenRateService } from '../local-oxygen-rate.service';

@Component({
    selector: 'table-oxygen-rate',
    standalone: true,
    templateUrl: './table-oxygen-rate.component.html',
    imports: [CommonModule,
        BladeTableComponent,
        BadgeStatusComponent,
        ButtonComponent,
        DirectivesModule
    ]
})
export class TableOxygenRateComponent {
    private readonly oxigen$ = inject(OxygenRateService);
    private readonly local$ = inject(LocalOxygenRateService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<OxygenRate_PageAPP | null>(null);
    tdSelected = signal<number>(-1);
    load = signal<boolean>(false);

    ngOnInit(): void {
        this.queryOxigenrates();
    }

    entities = computed(() => this.dataTable() ? this.dataTable()?.content : []);

    emit(data: OxygenRate_APP) {
        this.tdSelected.set(data.id);
        this.local$.emit(data);
    }

    queryOxigenrates() {
        this.load.set(true);
        this.oxigen$.page(this.paramPaginate()).subscribe({
            next: (value) => {
                this.dataTable.set(value)
                this.load.set(false);
            }
        });
    }

    clean() {
        this.tdSelected.set(-1);
        this.local$.emit(null);
    }
    paginate(e: any) {
        this.paramPaginate.set(e);
        this.queryOxigenrates();
    }
}
