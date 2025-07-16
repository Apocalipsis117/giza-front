import { Component, computed, inject, signal } from '@angular/core';
import { CarePrograms_APP, Diagnosis_APP, ServicePrograms_APP } from '@interfaces/index';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { CareProgramsService, DiagnosisService, ServiceProgramsService } from '@services/api';
import { TdetailDiagnosisComponent } from '../../diagnosis/tdetail-diagnosis/tdetail-diagnosis.component';
import { LocalCareProgramsService } from '../local-care-programs.service';
import { TdetailServiceProgramsComponent } from '../../service-programs/tdetail-service-programs/tdetail-service-programs.component';

@Component({
    selector: 'tdetail-care-programs',
    imports: [
        SelectSomeItemComponent,
        BlockSwitchStatusComponent,
        TdetailDiagnosisComponent,
        ButtonComponent,
        BladeDialogComponent,
        TdetailServiceProgramsComponent
    ],
    templateUrl: './tdetail-care-programs.component.html'
})
export class TdetailCareProgramsComponent {
    private readonly CarePrograms$ = inject(CareProgramsService);
    private readonly local$ = inject(LocalCareProgramsService);
    private readonly Diagnosis$ = inject(DiagnosisService);
    private readonly ServicePrograms$ = inject(ServiceProgramsService);
    data = signal<CarePrograms_APP | null>(null);
    diagnosis = signal<Diagnosis_APP|null>(null);
    programServices = signal<ServicePrograms_APP|null>(null);

    ngOnInit(): void {
        this.local$.readEntity$.subscribe(data => {
            if(data) {
                this.CarePrograms$.getBy(data.id).subscribe({
                    next: (value) => {
                        this.data.set(value);
                    }
                })
            }
        });
    }

    value = computed(() => {
        const _ = this.data()!;
        return {
            name: _.name,
            maxAge: _.maxAge,
            minAge: _.minAge,
            gender: _.gender.name,
            shortName: _.shortName,
            typeHistories: _.historyTypes || [],
            diagnoses: _.diagnoses || [],
            programServices: _.programServices || []
        };
    });

    watchDiagnosis(id: number) {
        this.Diagnosis$.getBy(id).subscribe({
            next: (value) => {
                this.diagnosis.set(value);
            }
        });
    }

    watchprogramServices(id: number) {
        this.ServicePrograms$.getBy(id).subscribe({
            next: (value) => {
                this.programServices.set(value);
            }
        });
    }
}
