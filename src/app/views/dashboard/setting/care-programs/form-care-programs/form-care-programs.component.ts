import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputNumberComponent } from '@im-inputs/input-number/input-number.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTagsComponent } from '@im-inputs/input-tags/input-tags.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { FormControlOption, FormGroupTyped, IForm } from '@interfaces/index';
import { CarePrograms_APPDTO } from '@interfaces/setting/care-programs.i';
import { TypeHistoryService } from '@services/api';
import { ValidateArrayEmpty } from '@valid-control/index';

@Component({
    selector: 'form-care-programs',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextComponent,
        InputNumberComponent,
        InputSelectComponent,
        InputTagsComponent
    ],
    templateUrl: './form-care-programs.component.html'
})
export class FormCareProgramsComponent {
    private validates = viewChildren('validate');
    private readonly fb = inject(FormBuilder);
    private readonly TypeHistory$ = inject(TypeHistoryService);

    optionsTypeHistory = signal<FormControlOption[]>([]);

    form: FormGroup;
    formCloneEntity: CarePrograms_APPDTO;
    formEntity: IForm<CarePrograms_APPDTO> = {
        genderId:        [null],
        maxAge:          [NaN],
        minAge:          [NaN],
        name:            [''],
        shortName:       [''],
        historyTypeIds:  [[] as number[], [ValidateArrayEmpty()]],
        diagnosisIds:    [[] as number[]],
        programServices: this.fb.array([])
    }

    constructor() {
        this.form = this.fb.group(this.formEntity);
        this.formCloneEntity = ngFormHelper.unboxProperties(this.formEntity);
    }

    get control() {
        return this.form.controls as FormGroupTyped<CarePrograms_APPDTO>;
    }

    ngOnInit(): void {
        this.TypeHistory$.list('options').subscribe(data => this.optionsTypeHistory.set(data));
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
