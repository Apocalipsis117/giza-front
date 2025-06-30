import { Component, input, computed, inject, signal, output } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { DirectivesModule } from '@directive/module';
import { PipesModule } from '@pipes/module';
import { NgClass } from '@angular/common';
import { LocalMedicineService } from '../local-medicine.service';
import { Medicine_PageAPP } from '@interfaces/index';

@Component({
    selector: 'table-medicine',
    standalone: true,
    imports: [
        BladeTableComponent,
        ButtonComponent,
        DirectivesModule,
        PipesModule,
        NgClass
    ],
    templateUrl: './table-medicine.component.html'
})
export class TableMedicineComponent {
    paginate = output<any>();
    localServ = inject(LocalMedicineService);
    dataTable = input<Medicine_PageAPP | null>(null);
    tdSelected = signal<number>(-1);

    list = computed(() => this.dataTable() ? this.dataTable()!.content : []);
    load = computed(() => this.dataTable() ? this.dataTable()!.content.length > 0 : false);

    emit(data: any) {
        this.tdSelected.set(data.id);
        this.localServ.emit(data);
    }

    // optional
    clean() {
        this.tdSelected.set(-1);
        this.localServ.emit(null);
    }
}
