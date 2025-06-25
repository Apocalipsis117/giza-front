import { Component, computed, inject, input, output, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { AssistanceServiceAPP, AssistanceServiceAPP_PAGE } from '@interfaces/app';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { LocalAssistanceServiceService } from '../local-assistance-service.service';


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
    private readonly local$ = inject(LocalAssistanceServiceService);
    public data = input<AssistanceServiceAPP_PAGE | null>(null);
    tdSelected = signal<number>(-1);
    paginate = output<any>();

    list = computed(() => this.data() ? this.data()!.content : []);

    emitAssistance(item: AssistanceServiceAPP) {
        this.tdSelected.set(item.id);
        this.local$.assistanceServEmit(item);
    }
    clean() {
        this.tdSelected.set(-1);
        this.local$.assistanceServEmit(null);
    }
}
