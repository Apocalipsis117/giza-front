import { Component, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ngFormHelper, queries } from '@helpers/index';
import { DiagnosisAPP_PAGE, DiagnosisDTO_APP } from '@interfaces/app';
import { ActionName, BarActions, IForm } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { NoteComponent } from '@layouts/shared/note/note.component';
import { DiagnosisService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormDiagnosisComponent } from './form-diagnosis/form-diagnosis.component';
import { TableDiagnosisComponent } from './table-diagnosis/table-diagnosis.component';
import { TdetailDiagnosisComponent } from './tdetail-diagnosis/tdetail-diagnosis.component';

@Component({
    selector: 'app-diagnosis',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        NoteComponent,
        TdetailDiagnosisComponent,
        TableDiagnosisComponent,
        FormDiagnosisComponent
    ],
    templateUrl: './diagnosis.component.html'
})
export class DiagnosisComponent {
    @ViewChild('table') table!: TableDiagnosisComponent;
    diagnosis$ = inject(DiagnosisService);
    swal = inject(SweetalertService);
    fb = inject(FormBuilder);
    diagnosis = signal<DiagnosisAPP_PAGE | null>(null);
    paramPaginate = signal<any>(queries.paramsPage);
    form!: FormGroup;
    actionsTdetail: BarActions = {
        delete: true,
        clean: true,
        edit: true
    }

    formDiagnosiCLone: DiagnosisDTO_APP;
    formDiagnosi: IForm<DiagnosisDTO_APP> = {
        active: [false],
        code: [''],
        common: [false],
        diagnosisCategoryId: [''],
        diagnosisChapterId: [''],
        diagnosisSubcategoryId: [''],
        genderId: [''],
        hospitalization: [false],
        maxAge: [''],
        minAge: [''],
        name: [''],
        notify: [false],
        procedure: [false]
    }

    constructor() {
        this.form = this.fb.group(this.formDiagnosi);
        this.formDiagnosiCLone = ngFormHelper.unboxProperties(this.formDiagnosi)
    }

    ngOnInit(): void {
        this.queryDiagnosis();
    }

    queryDiagnosis() {
        this.diagnosis$.getAllPage(this.paramPaginate()).subscribe(data => this.diagnosis.set(data))
    }

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.reset();
        else if (e === 'clean') this.cleanTdetail();
    }

    save() {
        if (this.form.valid) {
            this.swal.loading();
            this.diagnosis$.post(this.form.value).subscribe({
                next: (data) => {
                    console.info("data", data);
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
        this.form.reset(this.formDiagnosiCLone);
    }

    paginate(e: any) {
        this.paramPaginate.set(e);
        this.queryDiagnosis();
    }

    cleanTdetail() {
        this.table.clean();
    }
}
