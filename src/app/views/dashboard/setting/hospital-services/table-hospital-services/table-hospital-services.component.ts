import { Component, computed, inject, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { HospitalService_APP, HospitalService_PageAPP } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { HospitalServService } from '@services/api';
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
    private readonly HospitalServ$ = inject(HospitalServService);
    private readonly local$ = inject(LocalHospitalServService);
    tdSelected = signal<number>(-1);
    load = signal<boolean>(false);
    paramPaginate = signal<any>(queries.paramsPage);
    data = signal<HospitalService_PageAPP | null>(null);

    ngOnInit(): void {
        this.queryAssistaces();
    }

    list = computed(() => this.data() ? this.data()!.content : []);

    queryAssistaces() {
        this.load.set(true);
        this.HospitalServ$.page(this.paramPaginate()).subscribe({
            next: (value) => {
                this.data.set(value);
                this.load.set(false);
            }
        });
    }

    emit(item: HospitalService_APP) {
        this.tdSelected.set(item.id);
        this.local$.assistanceServEmit(item);
    }

    clean() {
        this.tdSelected.set(-1);
        this.local$.assistanceServEmit(null);
    }

    paginate(e: any) {
        this.paramPaginate.set(e);
        this.queryAssistaces();
    }
}
