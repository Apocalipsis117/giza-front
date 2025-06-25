import { Component, inject, viewChild } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { ActionName, ItemListApp } from '@interfaces/index';
import { BladeBoxCollapseComponent } from '@layouts/dashboard/blades/blade-box-collapse/blade-box-collapse.component';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeCollapseBlockComponent } from '@layouts/dashboard/blades/blade-collapse-block/blade-collapse-block.component';
import { BladeModalComponent } from '@layouts/dashboard/blades/blade-modal/blade-modal.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { BtnsAsideComponent } from '@layouts/dashboard/btns/btns-aside/btns-aside.component';
import menuPatient from '@local-data/app/patient-data.json';
import { SweetalertService, TestService } from '@services/app';
import { PatientsFormAffiliationComponent } from './patients-form-affiliation/patients-form-affiliation.component';
import { PatientsFormMainComponent } from './patients-form-main/patients-form-main.component';
import { PatientsFormOtherComponent } from './patients-form-other/patients-form-other.component';
import { PatientsProfileComponent } from './patients-profile/patients-profile.component';
import { PatientsTableComponent } from './patients-table/patients-table.component';
import { collapseControls_patients, tabsControls_patients } from './patients.env';

@Component({
    selector: 'view-patients',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule,
        BladeBoxPanelComponent,
        BladeCollapseBlockComponent,
        BladeBoxCollapseComponent,
        PatientsFormMainComponent,
        PatientsFormOtherComponent,
        BtnsAsideComponent,
        PatientsFormAffiliationComponent,
        PatientsTableComponent,
        BladeModalComponent,
        PatientsProfileComponent
    ],
    templateUrl: './patients.component.html'
})
export class PatientsComponent {
    private collpase = viewChild('collpase', { read: BladeBoxCollapseComponent});
    private formMain = viewChild('formMain', { read: PatientsFormMainComponent});
    private formOther = viewChild('formMain', { read: PatientsFormOtherComponent});
    private formAffiliation = viewChild('formAffiliation', { read: PatientsFormAffiliationComponent});
    private readonly testServ = inject(TestService);
    private swal = inject(SweetalertService);
    menuSidePatient: ItemListApp[] = [];

    collapseControl = collapseControls_patients;
    tabsControls = tabsControls_patients;

    constructor() {
        this.menuSidePatient = menuPatient.data.menuShortcut;
    }

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.reset();
    }

    save() {
        const formMain = this.formMain()?.form;
        const formOther = this.formOther()?.form;
        const formAffiliation = this.formAffiliation()?.form;
        if (formOther?.valid && formMain?.valid && formAffiliation?.valid) {
            this.swal.loading();
            const dto = {
                ...formOther.value,
                ...formMain.value,
                ...formAffiliation.value
            }
            this.testServ.post(dto).subscribe({
                next: () => {
                    this.swal.formSave('success');
                    this.reset();
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
            if(!formOther?.valid) this.collpase()?.show('patients-form-other');
        }
    }

    reset() {
        this.formMain()?.reset();
        this.formOther()?.reset();
    }
}
