import { Component, computed, inject, signal } from '@angular/core';
import { AssistanceServiceAPP } from '@interfaces/app';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { LocalAssistanceServiceService } from '../local-assistance-service.service';

@Component({
    selector: 'tdetail-assistance-service',
    standalone: true,
    templateUrl: './tdetail-assistance-service.component.html',
    imports: [
        BlockSwitchStatusComponent,
        SelectSomeItemComponent
    ]
})
export class TdetailAssistanceServiceComponent {
    private readonly local$ = inject(LocalAssistanceServiceService);
    data = signal<AssistanceServiceAPP | null>(null);

    ngOnInit(): void {
        this.local$.assistanceServ.subscribe(data => this.data.set(data))
    }

    value = computed(() => {
        return {
            name: this.data()!.name,
            serviceTypeName: this.data()!.serviceType.name,
            opportunityDays: this.data()!.opportunityDays,
            indicatorCode: this.data()!.indicatorCode,
            serviceLevelName: this.data()!.serviceLevel.name,
            isActiveInstitution: this.data()!.isActiveInstitution,
            appointments: this.data()!.appointments,
            receive: this.data()!.receive,
            surgeryRequired: this.data()!.surgeryRequired,
            specialist: this.data()!.specialist,
            doctor: this.data()!.doctor,
            historyTypeName: this.data()!.historyType.name,
        }
    })
}
