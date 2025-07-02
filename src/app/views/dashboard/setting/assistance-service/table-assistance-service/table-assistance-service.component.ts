import { Component, computed, inject, input, output, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { LocalAssistanceServiceService } from '../local-assistance-service.service';
import { HealthcareServices_APP, HealthcareServices_PageAPP } from '@interfaces/index';
import { queries } from '@helpers/index';
import { HealthcareServicesService } from '@services/api';


@Component({
    selector: 'table-assistance-service',
    standalone: true,
    templateUrl: './table-assistance-service.component.html',
    imports: [
        BladeTableComponent,
        ButtonComponent,
        DirectivesModule
    ]
})
export class TableAssistanceServiceComponent {
    private readonly HealthcareServices$ = inject(HealthcareServicesService);
    private readonly local$ = inject(LocalAssistanceServiceService);
    tdSelected = signal<number>(-1);
    load = signal<boolean>(false);
    paramPaginate = signal<any>(queries.paramsPage);
    data = signal<HealthcareServices_PageAPP | null>(null);

    ngOnInit(): void {
        this.queryAssistaces();
    }

    list = computed(() => this.data() ? this.data()!.content : []);

    queryAssistaces() {
        this.load.set(true);
        this.HealthcareServices$.page(this.paramPaginate()).subscribe({
            next: (value) => {
                this.data.set(value);
                this.load.set(false);
            }
        });
    }

    emit(item: HealthcareServices_APP) {
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
