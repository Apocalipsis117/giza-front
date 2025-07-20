import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputNumberComponent } from '@im-inputs/input-number/input-number.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTagsComponent } from '@im-inputs/input-tags/input-tags.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { FormControlOption, FormGroupTyped, IForm, ServicePrograms_APPDTO } from '@interfaces/index';
import { CarePrograms_APPDTO } from '@interfaces/setting/care-programs.i';
import { DiagnosisService, TypeGenderService, TypeHistoryService } from '@services/api';
import { ValidateArrayEmpty, ValidateNumberEmpty, ValidateStringEmpty, ValidStrict } from '@valid-control/index';
import { FormlistServiceProgramsComponent } from '../../service-programs/formlist-service-programs/formlist-service-programs.component';
import { InputSelectAddComponent } from '@im-inputs/input-select-add/input-select-add.component';

@Component({
    selector: 'form-care-programs',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextComponent,
        InputNumberComponent,
        InputSelectComponent,
        InputTagsComponent,
        FormlistServiceProgramsComponent,
        InputSelectAddComponent
    ],
    templateUrl: './form-care-programs.component.html'
})
export class FormCareProgramsComponent {
    private validates             = viewChildren('validate');
    private readonly fb           = inject(FormBuilder);
    private readonly Diagnosis$   = inject(DiagnosisService);
    private readonly TypeHistory$ = inject(TypeHistoryService);
    private readonly TypeGender$  = inject(TypeGenderService);
    optionsDiagnosis              = signal<FormControlOption[]>([]);
    optionsTypeHistory            = signal<FormControlOption[]>([]);
    optionsTypeGender             = signal<FormControlOption[]>([]);

    form: FormGroup;
    formCloneEntity: CarePrograms_APPDTO;
    formEntity: IForm<CarePrograms_APPDTO> = {
        genderId:        [null, [ValidStrict()]],
        maxAge:          [NaN, [ValidateNumberEmpty()]],
        minAge:          [NaN, [ValidateNumberEmpty()]],
        name:            ['', [ValidateStringEmpty()]],
        shortName:       [''],
        historyTypeIds:  [[] as number[], [ValidateArrayEmpty()]],
        diagnosisIds:    [[] as number[]],
        programServices: [[] as ServicePrograms_APPDTO[]]
    }

    constructor() {
        this.form = this.fb.group(this.formEntity);
        this.formCloneEntity = ngFormHelper.unboxProperties(this.formEntity);
    }

    get programServices() {
        return this.form.get('programServices')
    }

    get control() {
        return this.form.controls as FormGroupTyped<CarePrograms_APPDTO>;
    }

    ngOnInit(): void {
        this.Diagnosis$.options().subscribe(data => this.optionsDiagnosis.set(data));
        this.TypeHistory$.options().subscribe(data => this.optionsTypeHistory.set(data));
        this.TypeGender$.options().subscribe(data => this.optionsTypeGender.set(data));
    }

    reset() {
        this.form.reset(this.formCloneEntity);
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

    setValues(values: CarePrograms_APPDTO) {
        this.form.setValue(values);
    }
}
