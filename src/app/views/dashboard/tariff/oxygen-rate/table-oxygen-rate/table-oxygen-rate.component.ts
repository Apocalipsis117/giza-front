import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { LocalOxygenRateService } from '../local-oxygen-rate.service';
import { OxygenRate_APP, OxygenRate_PageAPP } from '@interfaces/index';

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
    paginate = output<any>();
    localServ = inject(LocalOxygenRateService);
    data = input<OxygenRate_PageAPP | null>(null);
    tdSelected = signal<number>(-1);


    list = computed(() => this.data() ? this.data()!.content : []);

    emit(data: OxygenRate_APP) {
        this.tdSelected.set(data.id);
        this.localServ.emit(data);
    }

    clean() {
        this.tdSelected.set(-1);
        this.localServ.emit(null);
    }
}
