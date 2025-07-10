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
    private readonly OxygenRate$ = inject(OxygenRateService);
    private readonly local$ = inject(LocalOxygenRateService);
    tdSelected = signal<number>(-1);
    load = signal<boolean>(false);
    paramPaginate = signal<any>(queries.paramsPage);
    data = signal<OxygenRate_PageAPP | null>(null);

    ngOnInit(): void {
        this.queryAssistaces();
    }

    list = computed(() => this.data() ? this.data()!.content : []);

    queryAssistaces() {
        this.load.set(true);
        this.OxygenRate$.page(this.paramPaginate()).subscribe({
            next: (value) => {
                this.data.set(value);
                this.load.set(false);
            }
        });
    }

    emit(item: OxygenRate_APP) {
        this.tdSelected.set(item.id);
        this.local$.entityEmit(item);
    }

    clean() {
        this.tdSelected.set(-1);
        this.local$.entityEmit(null);
    }

    paginate(e: any) {
        this.paramPaginate.set(e);
        this.queryAssistaces();
    }
}
