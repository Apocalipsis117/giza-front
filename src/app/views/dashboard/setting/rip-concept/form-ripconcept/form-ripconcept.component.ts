import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControlOption, FormGroupTyped, IForm, RipConcept_APPDTO } from '@interfaces/index';
// inputs
import { ngFormHelper } from '@helpers/index';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { GroupSoatService, TypeServiceService } from '@services/api';
import { forkJoin } from 'rxjs';
import { ValidateStringEmpty, ValidStrict } from '@valid-control/index';

@Component({
    selector: 'form-ripconcept',
    standalone: true,
    imports: [
        InputTextComponent,
        InputSelectComponent,
        // other
        ReactiveFormsModule
    ],
    templateUrl: './form-ripconcept.component.html'
})
export class FormRipconceptComponent {
    private validates = viewChildren('validate');
    private readonly fb = inject(FormBuilder);
    typeService$ = inject(TypeServiceService);
    GroupSoat$ = inject(GroupSoatService);
    options = signal<FormControlOption[]>([]);
    optionsTypeServ = signal<FormControlOption[]>([]);
    optionsGroupSoat = signal<FormControlOption[]>([]);

    form: FormGroup;
    formClone: RipConcept_APPDTO;
    formValues: IForm<RipConcept_APPDTO> = {
        name: ['', [ValidateStringEmpty()]],
        serviceTypeId: [null, [ValidStrict()]],
        soatGroupId: [null, [ValidStrict()]]
    }

    constructor() {
        this.form = this.fb.group(this.formValues);
        this.formClone = ngFormHelper.unboxProperties(this.formValues);
    }

    get control() {
        return this.form.controls as FormGroupTyped<RipConcept_APPDTO>;
    }

    ngOnInit(): void {
        this.queryApiStatic();
    }

    queryApiStatic() {
        const obs = forkJoin({
            typeService: this.typeService$.list('options'),
            groupSoat: this.GroupSoat$.list('options'),
        });

        obs.subscribe({
            next: (value) => {
                this.optionsTypeServ.set(value.typeService);
                this.optionsGroupSoat.set(value.groupSoat);
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

    setValues(values: RipConcept_APPDTO) {
        this.form.setValue(values);
    }
}
