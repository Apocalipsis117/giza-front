import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectSearhComponent } from '@im-inputs/input-select-searh/input-select-searh.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { FormControlOption, IForm, OxygenRate_APPDTO } from '@interfaces/index';
import { MedicineService } from '@services/api';

@Component({
    selector: 'form-oxygen-rate',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextComponent,
        InputSelectSearhComponent,
        InputOnoffComponent
    ],
    templateUrl: './form-oxygen-rate.component.html'
})
export class FormOxygenRateComponent {
    fb              = inject(FormBuilder);
    medicineServ    = inject(MedicineService);
    optionsMedicine = signal<FormControlOption[]>([]);

    form: FormGroup;
    formClone: OxygenRate_APPDTO;
    formControls: IForm<OxygenRate_APPDTO> = {
        medicineId: [null],
        name:       [''],
        status:     [true],
        value:      [''] // int
    }

    constructor() {
        this.form = this.fb.group(this.formControls);
        this.formClone = ngFormHelper.unboxProperties(this.formControls)
    }

    ngOnInit(): void {
        this.medicineServ.list('options').subscribe({
            next: (value) => {
                this.optionsMedicine.set(value)
            }
        });
    }

    reset() {
        this.form.reset(this.formClone);
    }
}
