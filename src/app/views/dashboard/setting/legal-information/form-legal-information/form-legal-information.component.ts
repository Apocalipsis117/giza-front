import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputAvatarComponent } from '@im-inputs/input-avatar/input-avatar.component';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { FormControlImagen, FormControlOption, FormGroupTyped, IForm, LegalInformation_APP, LegalInformation_APPDTO } from '@interfaces/index';
import { TypeRepresentativeService } from '@services/api';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'form-legal-information',
    imports: [
        ReactiveFormsModule,
        InputTextComponent,
        InputOnoffComponent,
        InputSelectComponent,
        InputAvatarComponent
    ],
    templateUrl: './form-legal-information.component.html'
})
export class FormLegalInformationComponent {
    private validates = viewChildren('validate');
    private readonly fb = inject(FormBuilder);
    private readonly TypeRepresentative$ = inject(TypeRepresentativeService);

    optionsTypeRepresentative = signal<FormControlOption[]>([]);

    form: FormGroup;
    formClone: LegalInformation_APPDTO;
    formValues: IForm<LegalInformation_APPDTO> = {
        healthcareRepTypeId: [null],
        name: [''],
        signatureImg: [''],
        status: [true]
    };

    constructor() {
        this.form = this.fb.group(this.formValues);
        this.formClone = ngFormHelper.unboxProperties(this.formValues);
    }

    get control() {
        return this.form.controls as FormGroupTyped<LegalInformation_APPDTO>;
    }

    avatar(event: FormControlImagen | null) {
        this.form.patchValue({
            signatureImg: event?.file || ''
        })
    }

    ngOnInit(): void {
        this.queryApiStatic();
    }

    queryApiStatic() {
        const obs = forkJoin({
            TypeRepresentative: this.TypeRepresentative$.list('options'),
        });

        obs.subscribe({
            next: (value) => {
                this.optionsTypeRepresentative.set(value.TypeRepresentative);
            }
        });
    }

    reset() {
        this.form.reset(this.formClone);
        this.form.clearValidators();
        this.form.updateValueAndValidity();
    }

    validate() {
        this.validates()?.forEach((x: any) => x.validate());
    }

    markAlltouched() {
        this.form?.markAllAsTouched();
        this.validate();
    }

    setValues(value: LegalInformation_APP) {
        this.form.setValue({
            healthcareRepTypeId: value.healthcareRepType.id,
            name: value.name,
            signatureImg: '',
            status: value.status

        } as LegalInformation_APPDTO);
    }
}
