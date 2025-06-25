import { CommonModule } from '@angular/common';
import { Component, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ngFormHelper, queries } from '@helpers/index';
import { AssistanceServDTO_APP, AssistanceServiceAPP_PAGE } from '@interfaces/app';
import { ActionName, BarActions, IForm } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { NoteComponent } from '@layouts/shared/note/note.component';
import { AssistanceServService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormAssistanceServiceComponent } from './form-assistance-service/form-assistance-service.component';
import { TableAssistanceServiceComponent } from './table-assistance-service/table-assistance-service.component';
import { TdetailAssistanceServiceComponent } from './tdetail-assistance-service/tdetail-assistance-service.component';

@Component({
    selector: 'app-assistance-service',
    standalone: true,
    templateUrl: './assistance-service.component.html',
    imports: [
        CommonModule,
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableAssistanceServiceComponent,
        FormAssistanceServiceComponent,
        TdetailAssistanceServiceComponent,
        NoteComponent
    ]
})
export class AssistanceServiceComponent {
    readonly table = viewChild('table', { read: TableAssistanceServiceComponent });
    private readonly asisstanceService$ = inject(AssistanceServService);
    private swal = inject(SweetalertService);
    private fb = inject(FormBuilder);
    asisstances = signal<AssistanceServiceAPP_PAGE | null>(null);
    actionsBar: BarActions = {
        edit: true,
        delete: true,
        clean: true
    };

    form!: FormGroup;
    formAssistanceCLone: AssistanceServDTO_APP;
    formAssistance: IForm<AssistanceServDTO_APP> = {
        name: ['', Validators.required],
        activeInstitution: [false],
        appointments: [false],
        doctor: [false],
        historyTypeId: [''],
        indicatorCode: [''],
        opportunityDays: ['', Validators.required],
        receive: [false],
        serviceLevelId: [''],
        serviceTypeId: [''],
        specialist: [false],
        surgeryRequired: [false]
    };
    paramPaginate = signal<any>(queries.paramsPage);

    constructor() {
        this.form = this.fb.group(this.formAssistance);
        this.formAssistanceCLone = ngFormHelper.unboxProperties(this.formAssistance);
    }

    ngOnInit(): void {
        this.queryAssistaces();
    }

    queryAssistaces() {
        this.asisstanceService$.getAllPage(this.paramPaginate()).subscribe(data => this.asisstances.set(data));
    }

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.reset();
        else if (e === 'clean') this.cleanTdetail();
    }

    save() {
        if (this.form.valid) {
            this.swal.loading();
            this.asisstanceService$.post(this.form.value).subscribe({
                next: () => {
                    this.swal.formSave('success');
                    this.queryAssistaces();
                    this.reset();
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
        }
    }

    reset() {
        this.form.reset(this.formAssistanceCLone);
    }

    cleanTdetail() {
        this.table()?.clean();
    }

    paginate(e: any) {
        this.paramPaginate.set(e);
        this.queryAssistaces();
    }

}
