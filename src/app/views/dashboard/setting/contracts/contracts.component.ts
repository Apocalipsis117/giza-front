import { CommonModule } from '@angular/common';
import { Component, inject, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DirectivesModule } from '@directive/module';
import { ngFormHelper } from '@helpers/index';
import { ActionName, ContractDTO_APP, IForm } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { ContractDTO } from '@models/index';
import { SweetalertService, TestService } from '@services/app';
import { FormContractsComponent } from './form-contracts/form-contracts.component';
import { TableContractsComponent } from './table-contracts/table-contracts.component';

@Component({
    selector: 'app-contracts',
    standalone: true,
    templateUrl: './contracts.component.html',
    imports: [
        CommonModule,
        BladePanelComponent,
        BladeBoxPanelComponent,
        FormContractsComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule,
        TableContractsComponent
    ]
})
export class ContractsComponent {
    readonly tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent})
    private readonly testServ = inject(TestService);
    private swal = inject(SweetalertService);
    private fb = inject(FormBuilder);
    form: FormGroup;
    tabsControls = [
        {
            idConnect: 'contractParams',
            label: 'Nuevo',
            active: true
        },
        {
            idConnect: 'contracTariff',
            label: 'Contratos',
            active: false
        }
    ]

    contractFormClone: ContractDTO_APP;
    contractForm: IForm<ContractDTO_APP> = {
        contractNumber: ['', Validators.required],
        contractName: [''],
        startDate: [''],
        endDate: [''],
        upc: [''],
        isActive: [true],
        billingInvoice: [''],
        observation: [''],
        groupBilling: [false],
        outpatientAuthorization: [false],
        hospitalizationAuthorization: [false],
        emergencyAuthorization: [false],
        rightsVerification: [false],
        multivitamins: [false],
        soatCoverage: [false],
        copayment: [false],
        administratorId: [''],
        benefitPlanId: [''],
        tariffManualId: [''],
        medicationTariffId: [''],
        materialsTariffId: [''],
        transfersTariffId: [''],
        oxygenTariffId: [''],
        careTypeId: [''],
        levelId: ['']
    }

    constructor() {
        this.form = this.fb.group(this.contractForm);
        this.contractFormClone = ngFormHelper.unboxProperties(this.contractForm)
    }

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.reset();
    }

    save() {
        if(this.form.valid) {
            this.swal.loading();
            this.testServ.post(ContractDTO.setProperty(this.form.value)).subscribe({
                next: (data) => {
                    console.log("data", data);
                    this.swal.formSave('success');
                    this.reset();
                    this.showTab(1);
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
        }
    }

    reset() {
        this.form.reset(this.contractFormClone);
    }

    showTab(id: number) {
        this.tabController()?.showTab(this.tabsControls[id].idConnect);
    }
}
