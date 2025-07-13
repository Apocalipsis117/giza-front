import { Component, inject, signal, viewChild, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputSelectAddComponent } from '@im-inputs/input-select-add/input-select-add.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { Diagnosis_APP, DiagnosisGroup_APPDTO, FormControlOption, FormGroupTyped, IForm } from '@interfaces/index';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { DiagnosisService } from '@services/api';
import { ValidateArrayEmpty, ValidateStringEmpty } from '@valid-control/index';
import { forkJoin } from 'rxjs';
import { TdetailDiagnosisComponent } from '../../diagnosis/tdetail-diagnosis/tdetail-diagnosis.component';
import { SweetalertService } from '@services/app';

@Component({
    selector: 'form-diagnosis-group',
    standalone: true,
    imports: [
        InputTextComponent,
        InputSelectAddComponent,
        ReactiveFormsModule,
        BladeDialogComponent,
        TdetailDiagnosisComponent
    ],
    templateUrl: './form-diagnosis-group.component.html'
})
export class FormDiagnosisGroupComponent {
    private validates = viewChildren('validate');
    readonly dialogDetail = viewChild('dialogDetail', { read: BladeDialogComponent});
    private readonly swa$ = inject(SweetalertService);
    private readonly fb = inject(FormBuilder);
    private readonly Diagnosis$ = inject(DiagnosisService);
    optionsDiagnosis = signal<FormControlOption[]>([]);
    diagnosis = signal<Diagnosis_APP|null>(null);

    form: FormGroup;
    formClone: DiagnosisGroup_APPDTO;
    formValues: IForm<DiagnosisGroup_APPDTO> = {
        diagnosisIds: [[], [ValidateArrayEmpty()]],
        name: ['', [ValidateStringEmpty()]]
    }

    constructor() {
        this.form = this.fb.group(this.formValues);
        this.formClone = ngFormHelper.unboxProperties(this.formValues);
    }

    get control() {
        return this.form.controls as FormGroupTyped<DiagnosisGroup_APPDTO>;
    }

    ngOnInit(): void {
        this.queryApiStatic();
    }

    queryApiStatic() {
        const obs = forkJoin({
            diagnosis: this.Diagnosis$.options(),
        });

        obs.subscribe({
            next: (value) => {
                this.optionsDiagnosis.set(value.diagnosis);
            }
        });
    }

    queryByIndex(index: any) {
        this.swa$.loading();
        this.Diagnosis$.getBy(index).subscribe({
            next: (value) => {
                this.swa$.close();
                this.diagnosis.set(value);
                this.dialogDetail()?.show();
            }
        })
    }

    reset() {
        this.form.reset(this.formClone);
        this.form.clearValidators();
        this.form.updateValueAndValidity();
    }

    validate() {
        this.validates()?.forEach((x: any) => x.validate())
    }

    markAlltouched() {
        this.form?.markAllAsTouched();
        this.validate();
    }

    setValues(values: DiagnosisGroup_APPDTO) {
        this.form.setValue(values);
    }
}
