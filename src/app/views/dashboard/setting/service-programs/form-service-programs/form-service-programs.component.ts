import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputNumberComponent } from '@im-inputs/input-number/input-number.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { FormControlOption, FormGroupTyped, IForm, ServicePrograms_APPDTO } from '@interfaces/index';
import { ExternalCauseService, PurposeConsultationService, TypeGenderService } from '@services/api';
import { ValidateNumberEmpty, ValidateStringEmpty, ValidStrict } from '@valid-control/index';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'form-service-programs',
    imports: [
        ReactiveFormsModule,
        InputTextComponent,
        InputSelectComponent,
        InputNumberComponent,
    ],
    templateUrl: './form-service-programs.component.html'
})
export class FormServiceProgramsComponent {
    private validates = viewChildren('validate');
    private readonly fb = inject(FormBuilder);
    private readonly PurposeConsultation$ = inject(PurposeConsultationService);
    private readonly TypeGender$ = inject(TypeGenderService);
    private readonly ExternalCause$ = inject(ExternalCauseService);

    optionsGender = signal<FormControlOption[]>([]);
    optionsExternalCause = signal<FormControlOption[]>([]);
    optionsPurposeConsultation = signal<FormControlOption[]>([]);

    form!: FormGroup;
    formClone: ServicePrograms_APPDTO;
    formControls: IForm<ServicePrograms_APPDTO> = {
        id: [null],
        careProgramsId: [null],
        code: [''],
        component: ['', [ValidateStringEmpty()]],
        consultationPurposeId: [null, [ValidStrict()]],
        externalCauseId: [null, [ValidStrict()]],
        genderId: [null, [ValidStrict()]],
        maxAge: [NaN, [ValidateNumberEmpty()]],
        minAge: [NaN, [ValidateNumberEmpty()]],
        name: ['', [ValidateStringEmpty()]]
    }
    constructor() {
        this.form = this.fb.group(this.formControls);
        this.formClone = ngFormHelper.unboxProperties(this.formControls);
    }

    get control() {
        return this.form.controls as FormGroupTyped<ServicePrograms_APPDTO>;
    }

    ngOnInit(): void {
        this.queryApiStatic();
    }

    queryApiStatic() {
        forkJoin({
            purposeConsultation: this.PurposeConsultation$.options(),
            externalCause: this.ExternalCause$.options(),
            genders: this.TypeGender$.options(),
        }).subscribe({
            next: (value) => {
                this.optionsPurposeConsultation.set(value.purposeConsultation);
                this.optionsExternalCause.set(value.externalCause);
                this.optionsGender.set(value.genders);
            }
        });
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

    setValues(values: ServicePrograms_APPDTO) {
        this.form.setValue(values);
    }
}
