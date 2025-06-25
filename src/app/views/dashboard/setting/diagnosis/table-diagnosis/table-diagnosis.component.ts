import { Component, input, computed, inject, signal, output } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { DirectivesModule } from '@directive/module';
import { DiagnosisAPP_PAGE } from '@interfaces/app';
import { PipesModule } from '@pipes/module';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';
import { LocalDiagnosisService } from '../local-diagnosis.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'table-diagnosis',
    standalone: true,
    imports: [
        BladeTableComponent,
        BadgeStatusComponent,
        ButtonComponent,
        DirectivesModule,
        PipesModule,
        NgClass
    ],
    templateUrl: './table-diagnosis.component.html'
})
export class TableDiagnosisComponent {
    paginate = output<any>();
    localServ = inject(LocalDiagnosisService);
    dataTable = input<DiagnosisAPP_PAGE | null>(null);
    tdSelected = signal<number>(-1);

    list = computed(() => this.dataTable() ? this.dataTable()!.content : []);
    load = computed(() => this.dataTable() ? this.dataTable()!.content.length > 0 : false);

    emit(data: any) {
        this.tdSelected.set(data.id);
        this.localServ.emitDiagnosis(data);
    }

    // optional
    clean() {
        this.tdSelected.set(-1);
        this.localServ.emitDiagnosis(null);
    }
}
