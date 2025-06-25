import { Component, inject, viewChild } from '@angular/core';
import { ActionName } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { SweetalertService, TestService } from '@services/app';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyStatisticsComponent } from './survey-statistics/survey-statistics.component';
import { SurveyTableComponent } from './survey-table/survey-table.component';


@Component({
    selector: 'view-survey',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        SurveyStatisticsComponent,
        SurveyTableComponent,
        SurveyFormComponent
    ],
    templateUrl: './survey.component.html'
})
export class SurveyComponent {
    private surveyForm = viewChild('surveyForm', { read: SurveyFormComponent });
    private readonly testServ = inject(TestService);
    private swal = inject(SweetalertService);

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.reset();
    }

    save() {
        const surveyForm = this.surveyForm()?.form;
        if (surveyForm?.valid) {
            const dto = {
                ...surveyForm.value
            }
            this.swal.loading();
            this.testServ.post(dto).subscribe({
                next: () => {
                    this.swal.formSave('success');
                    this.reset();
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
        }
    }

    reset() {
        this.surveyForm()?.reset();
    }
}
