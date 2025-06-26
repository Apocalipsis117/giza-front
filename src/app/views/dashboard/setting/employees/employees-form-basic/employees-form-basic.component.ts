import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { ngFormHelper, queryData } from '@helpers/index';
import { EmployeesDTO_APP, IForm, FormControlOption } from '@interfaces/index';
import { ApartmentCitiesService, TypeJobtitleService } from '@services/api';

@Component({
    selector: 'employees-form-basic',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelCheckboxComponent,
        InputPanelSelectComponent,
        ReactiveFormsModule
    ],
    templateUrl: './employees-form-basic.component.html'
})
export class EmployeesFormBasicComponent {
    private readonly TypeJobtitle$ = inject(TypeJobtitleService);
    private readonly countries$ = inject(ApartmentCitiesService);
    private fb = inject(FormBuilder);
    options = signal<FormControlOption[]>([]);
    optionsDepartments = signal<FormControlOption[]>([]);
    optionsCities = signal<FormControlOption[]>([]);
    optionsJobtitle = signal<FormControlOption[]>([]);
    form!: FormGroup;

    formDataCLone: EmployeesDTO_APP;
    formData: IForm<EmployeesDTO_APP> = {
        identityNumber: [''],
        firstName: [''],
        lastName: [''],
        address: [''],
        phone: [''],
        email: [''],
        registrationNumber: [''],
        status: [true],
        cityId: [''],
        departmentId: [''],
        jobPositionId: [''],
        identificationTypeIpsId: [''],
        contractId: ['']
    };

    constructor() {
        this.form = this.fb.group(this.formData);
        this.formDataCLone = ngFormHelper.unboxProperties(this.formData);
    }

    ngOnInit(): void {
        this.countries$.apartaments('options').subscribe(data => this.optionsDepartments.set(data));
        this.TypeJobtitle$.getAll('options').subscribe(data => this.optionsJobtitle.set(data));
        this.changeApartment();
    }

    changeApartment() {
        this.form.get('departmentId')!.valueChanges.subscribe({
            next: (value) => {
                console.log("value", value);
            }
        });
    }

    reset() {
        this.form.reset(this.formDataCLone);
    }
}
