import { Component, inject, signal } from '@angular/core';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { TableRipconceptComponent } from './table-ripconcept/table-ripconcept.component';
import { FormRipconceptComponent } from './form-ripconcept/form-ripconcept.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { ActionName, IForm, RIPConceptAPP, RIPConceptDTO_APP } from '@interfaces/index';
import { SweetalertService, TestService } from '@services/app';
import { RipConceptService } from '@services/api';

@Component({
    selector: 'rip-concept',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableRipconceptComponent,
        FormRipconceptComponent
    ],
    templateUrl: './rip-concept.component.html'
})
export class RipConceptComponent {
    testServ = inject(TestService);
    ripServ = inject(RipConceptService);
    swal = inject(SweetalertService);
    fb = inject(FormBuilder);
    ripsList = signal<RIPConceptAPP[]>([]);
    form!: FormGroup;

    formRipCLone: RIPConceptDTO_APP;
    formRip: IForm<RIPConceptDTO_APP> = {
        name: ['', Validators.required],
        typeServiceId: [''],
        groupSoatId: ['']
    }

    constructor() {
        this.form = this.fb.group(this.formRip);
        this.formRipCLone = ngFormHelper.unboxProperties(this.formRip)
    }

    ngOnInit(): void {
        this.queryRips()
    }

    queryRips() {
        this.ripServ.getAll().subscribe((data) => this.ripsList.set(data));
    }

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.reset();
    }

    save() {
        if (this.form.valid) {
            this.swal.loading();
            this.ripServ.post(this.form.value).subscribe({
                next: () => {
                    this.swal.formSave('success');
                    this.queryRips();
                    this.reset();
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
        }
    }

    reset() {
        this.form.reset(this.formRipCLone);
    }
}
