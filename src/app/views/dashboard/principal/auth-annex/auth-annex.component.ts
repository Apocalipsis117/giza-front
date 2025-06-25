import { Component, inject, viewChild } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { ActionName } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeBoxUiComponent } from '@layouts/dashboard/blades/blade-box-ui/blade-box-ui.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { CardPatientDataComponent } from '@layouts/dashboard/cards/card-patient-data/card-patient-data.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { TitleIconSectionComponent } from '@layouts/shared/title-icon-section/title-icon-section.component';
import { SweetalertService, TestService } from '@services/app';
import { AuthAnnexFormDateComponent } from './auth-annex-form-date/auth-annex-form-date.component';
import { AuthAnnexFormDiagnosisComponent } from './auth-annex-form-diagnosis/auth-annex-form-diagnosis.component';
import { AuthAnnexFormFooterComponent } from './auth-annex-form-footer/auth-annex-form-footer.component';
import { AuthAnnexFormMaterialsComponent } from './auth-annex-form-materials/auth-annex-form-materials.component';
import { AuthAnnexFormServicesComponent } from './auth-annex-form-services/auth-annex-form-services.component';
import { tabs_form_annex } from './auth-annex.env';

@Component({
  selector: 'auth-annex',
  standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        InputPanelTextComponent,
        ButtonComponent,
        BladeBoxUiComponent,
        TitleIconSectionComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule,
        CardPatientDataComponent,
        AuthAnnexFormDateComponent,
        AuthAnnexFormDiagnosisComponent,
        AuthAnnexFormMaterialsComponent,
        AuthAnnexFormServicesComponent,
        AuthAnnexFormFooterComponent
    ],
  templateUrl: './auth-annex.component.html'
})
export class AuthAnnexComponent {
    private readonly testServ = inject(TestService);
    private tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent });
    private formAnnex = viewChild('formAnnex', { read: AuthAnnexFormDateComponent });
    private formFooter = viewChild('formFooter', { read: AuthAnnexFormFooterComponent });
    private swal = inject(SweetalertService);

    tabsControls = tabs_form_annex;

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.reset();
    }

    save() {
        const formAnnex = this.formAnnex()?.form;
        const formFooter = this.formFooter()?.form;
        if (formAnnex?.valid && formFooter?.valid) {
            const dto = {
                ...formAnnex.value,
                ...formFooter.value,
            };
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
        this.formAnnex()?.reset();
        this.formFooter()?.reset();
    }

    showTab(id: number) {
        this.tabController()?.showTab(this.tabsControls[id].idConnect);
    }
}
