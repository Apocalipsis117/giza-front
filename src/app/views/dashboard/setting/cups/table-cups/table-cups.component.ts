import { LowerCasePipe } from '@angular/common';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { CupsAPP, CupsAPP_PAGE } from '@interfaces/app';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { LocalCupsService } from '../local-cups.service';

@Component({
    selector: 'table-cups',
    standalone: true,
    imports: [
        BladeTableComponent,
        LowerCasePipe,
        ButtonComponent,
        DirectivesModule
    ],
    templateUrl: './table-cups.component.html'
})
export class TableCupsComponent {
    paginate = output<any>();
    localServ = inject(LocalCupsService);
    dataTable = input<CupsAPP_PAGE | null>(null);
    tdSelected = signal<number>(-1);

    list = computed(() => this.dataTable() ? this.dataTable()!.content : []);
    load = computed(() => this.dataTable() ? this.dataTable()!.content.length > 0 : false);

    emit(data: CupsAPP) {
        this.tdSelected.set(data.id);
        this.localServ.emitCup(data);
    }
    clean() {
        this.tdSelected.set(-1);
        this.localServ.emitCup(null);
    }
}
