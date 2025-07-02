import { Component, computed, inject, signal } from '@angular/core';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { LocalAssistanceServiceService } from '../local-assistance-service.service';
import { HealthcareServices_APP, HealthcareServices_Detail } from '@interfaces/index';

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
    data = signal<HealthcareServices_APP | null>(null);

    ngOnInit(): void {
        this.local$.assistanceServ.subscribe(data => this.data.set(data))
    }

    value = computed((): HealthcareServices_Detail => {
        return {
            name: this.data()!.name,
            serviceType: this.data()!.serviceType.name,
            opportunityDays: this.data()!.opportunityDays,
            indicatorCode: this.data()!.indicatorCode,
            serviceLevel: this.data()!.serviceLevel.name,
            institutionActive: this.data()!.institutionActive,
            appointments: this.data()!.appointments,
            receive: this.data()!.receive,
            procedures: this.data()!.surgery,
            specialists: this.data()!.specialists,
            doctor: this.data()!.doctor,
            historyType: this.data()!.historyType.name,
            consultations: this.data()!.consultations,
            medicines: this.data()!.medicines,
            otherServices: this.data()!.otherServices,
            surgery: this.data()!.surgery,
        }
    })
}
