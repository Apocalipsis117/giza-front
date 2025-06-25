import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DirectivesModule } from '@directive/module';
import { ngFormHelper } from '@helpers/index';
import { InstitutionDTO_APP } from '@interfaces/app';
import { ActionName, IForm, tabsControls } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { NoteComponent } from '@layouts/shared/note/note.component';
import { InstitutionsService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormInstitutionsComponent } from './form-institutions/form-institutions.component';
import { TableInstitutionsComponent } from './table-institutions/table-institutions.component';
import { TdetailInstitutionsComponent } from './tdetail-institutions/tdetail-institutions.component';

@Component({
    selector: 'app-institutions',
    standalone: true,
    imports: [
        BladePanelComponent,
        CommonModule,
        BladeBoxPanelComponent,
        DirectivesModule,
        BladeTabsHorizontalComponent,
        TableInstitutionsComponent,
        TdetailInstitutionsComponent,
        FormInstitutionsComponent,
        NoteComponent
    ],
    templateUrl: './institutions.component.html'
})
export class InstitutionsComponent {
    @ViewChild('tabControlle') tabControlle!: BladeTabsHorizontalComponent;
    institutionsServ = inject(InstitutionsService);
    swal = inject(SweetalertService);
    fb = inject(FormBuilder);
    form!: FormGroup;
    tabs: tabsControls[] = [
        {
            active: true,
            idConnect: 'tab-institution-new',
            label: 'Crear'
        },
        {
            active: false,
            idConnect: 'tab-institution-list',
            label: 'Lista'
        }
    ];

    formInstitutionCLone: any;
    formInstitution: IForm<InstitutionDTO_APP> = {
        address: [''],
        departmentId: [''],
        email: [''],
        cityId: [''],
        complexityLevelId: [''],
        legalNatureId: [''],
        name: [''],
        phone: [''],
        roomCode: [''],
        toRefer: [false],
        whoRefer: [false],
        code: ['']
    }

    constructor() {
        this.form = this.fb.group(this.formInstitution);
        this.formInstitutionCLone = ngFormHelper.unboxProperties(this.formInstitution)
    }
    ngOnInit(): void {
        this.queryInstitutions()
    }

    queryInstitutions() {
        this.institutionsServ.getAll().subscribe({
            next: data => {
                console.log("data", data);
            },
            error: () => console.warn('Error al conseguir lista')
        })
    }

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.reset();
    }

    save() {
        if (this.form.valid) {
            this.swal.loading();
            this.institutionsServ.post(this.form.value).subscribe({
                next: () => {
                    this.swal.formSave('success');
                    this.reset();
                    this.showTab(1);
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
        }
    }

    reset() {
        this.form.reset(this.formInstitutionCLone);
    }

    showTab(id: number) {
        this.tabControlle.showTab(this.tabs[id].idConnect);
    }
}
