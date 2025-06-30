import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ngFormHelper, queries } from '@helpers/index';
import { ActionName, CostCenter_PageAPP, CostCenter_APPDTO, IForm } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { NoteComponent } from '@layouts/shared/note/note.component';
import { CostCenterService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormCostCenterComponent } from './form-cost-center/form-cost-center.component';
import { TableCostCenterComponent } from './table-cost-center/table-cost-center.component';

@Component({
    selector: 'cost-center',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableCostCenterComponent,
        FormCostCenterComponent,
        NoteComponent
    ],
    templateUrl: './cost-center.component.html'
})
export class CostCenterComponent {
    swal = inject(SweetalertService);
    centerCost = inject(CostCenterService);
    fb = inject(FormBuilder);
    costCenterList = signal<CostCenter_PageAPP | null>(null);
    form: FormGroup;

    costCenterFormClone: CostCenter_APPDTO;
    costCenterForm: IForm<CostCenter_APPDTO> = {
        areaId: [''],
        accountingAccount: [''],
        status: [true],
        name: ['']
    }

    paramPaginate = signal<any>(queries.paramsPage);

    constructor() {
        this.form = this.fb.group(this.costCenterForm);
        this.costCenterFormClone = ngFormHelper.unboxProperties(this.costCenterForm);
    }
    ngOnInit(): void {
        this.queryCostCenterList();
    }

    queryCostCenterList() {
        this.centerCost.getAllPage(this.paramPaginate()).subscribe({
            next: data => {
                this.costCenterList.set(data);
            },
            error: () => console.log('error')
        })
    }

    actionForm(event: ActionName) {
        if (event === 'save') this.save();
        else if (event === 'reset') this.reset();
    }

    save() {
        if (this.form.valid) {
            this.swal.loading();
            this.centerCost.post(this.form.value).subscribe({
                next: () => {
                    this.swal.formSave('success');
                    this.reset();
                    this.queryCostCenterList();
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
        }
    }

    reset() {
        this.form.reset(this.costCenterFormClone)
    }

    paginate(e: any) {
        this.paramPaginate.set(e);
        this.queryCostCenterList();
    }

}


