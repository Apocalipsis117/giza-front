import { Component, inject, input, signal, viewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { formHelper, ngFormHelper } from '@helpers/index';
import { InputNumberComponent } from '@im-inputs/input-number/input-number.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { FormControlOption, FormGroupTyped, IForm, ServicePrograms_APPDTO } from '@interfaces/index';
import { BladeBoxTitleComponent } from '@layouts/dashboard/blades/blade-box-title/blade-box-title.component';
import { TableUiComponent } from '@layouts/dashboard/tables/table-ui/table-ui.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { SweetalertService } from '@services/app';
import { ValidateStringEmpty } from '@valid-control/index';

@Component({
    selector: 'formlist-service-programs',
    imports: [
        ReactiveFormsModule,
        InputTextComponent,
        InputSelectComponent,
        InputNumberComponent,
        BladeBoxTitleComponent,
        ButtonComponent,
        TableUiComponent
    ],
    templateUrl: './formlist-service-programs.component.html'
})
export class FormlistServiceProgramsComponent {
    private validates = viewChildren('validate');
    private readonly swal$ = inject(SweetalertService);
    public readonly optionsGender = input<FormControlOption[]>([]);
    public list = input<AbstractControl | null>();
    editingIndex = signal<number | null>(null);
    fb = inject(FormBuilder);
    form!: FormGroup;
    formCLone: ServicePrograms_APPDTO;
    formControls: IForm<ServicePrograms_APPDTO> = {
        id: [null],
        careProgramsId: [null],
        code: [''],
        component: [''],
        consultationPurposeId: [null],
        externalCauseId: [null],
        genderId: [null],
        maxAge: [NaN],
        minAge: [NaN],
        name: ['', [ValidateStringEmpty()]]
    }

    constructor() {
        this.form = this.fb.group(this.formControls);
        this.formCLone = ngFormHelper.unboxProperties(this.formControls)
    }
    get itemsTable() {
        return this.items.map(x => ({
            ...x,
            genderName: formHelper.findOption(x.genderId, this.optionsGender())?.name
        }))
    }
    get control() {
        return this.form.controls as FormGroupTyped<ServicePrograms_APPDTO>;
    }

    get items(): ServicePrograms_APPDTO[] {
        return (this.list()?.value ?? []) as ServicePrograms_APPDTO[];
    }

    set items(newList: ServicePrograms_APPDTO[]) {
        this.list()?.setValue(newList);
        this.list()?.markAsDirty();
        this.list()?.updateValueAndValidity();
    }


    addItem() {
        const editingIndex = this.editingIndex();
        if (this.form.invalid) {
            this.markAlltouched();
            this.swal$.formSave('warning');
            return
        };

        const newItem: ServicePrograms_APPDTO = this.form.value;
        const updated = [...this.items];

        if (editingIndex !== null) {
            updated[editingIndex] = newItem;
        } else {
            updated.push(newItem);
        }

        this.items = updated;
        this.reset();
    }

    edit(index: number) {
        this.form.setValue(this.items[index]);
        this.editingIndex.set(index);
    }

    delete(index: number) {
        const updated = [...this.items];
        updated.splice(index, 1);
        this.items = updated;
        this.reset();
    }

    cancelEdit() {
        this.reset();
    }

    reset() {
        this.form.reset(this.formCLone);
        this.editingIndex.set(null);
    }

    markAlltouched() {
        this.form?.markAllAsTouched();
        this.validate();
    }
    validate() {
        this.validates()?.forEach((x: any) => x.validate())
    }
}
