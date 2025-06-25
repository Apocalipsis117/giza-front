import { Component, computed, inject, input, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { HospitalServiceAPP } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { LocalHospitalServService } from '../local-hospital-serv.service';

@Component({
    selector: 'table-hospital-services',
    standalone: true,
    imports: [
        BladeTableComponent,
        DirectivesModule,
        ButtonComponent
    ],
    templateUrl: './table-hospital-services.component.html'
})
export class TableHospitalServicesComponent {
    localServ = inject(LocalHospitalServService);
    dataTable = input<HospitalServiceAPP[]>([]);
    tdSelected = signal<number>(-1);

    load = computed(() => this.dataTable().length > 0);

    emit(data: HospitalServiceAPP) {
        this.tdSelected.set(data.id);
        this.localServ.emit(data);
    }

    clean() {
        this.tdSelected.set(-1);
        this.localServ.emit(null);
    }
}
