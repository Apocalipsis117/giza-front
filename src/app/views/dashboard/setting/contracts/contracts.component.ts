import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { ActionName, BarActions } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { ContractService } from '@services/api';
import { SweetalertService, TestService } from '@services/app';
import { FormContractsComponent } from './form-contracts/form-contracts.component';
import { TableContractsComponent } from './table-contracts/table-contracts.component';
import { TdetailContractsComponent } from './tdetail-contracts/tdetail-contracts.component';

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
        TableContractsComponent,
        TdetailContractsComponent
    ]
})
export class ContractsComponent {
    private readonly destroyRef = inject(DestroyRef);
    private readonly contract$ = inject(ContractService);
    private swal = inject(SweetalertService);
    readonly tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent})
    readonly formContractRef = viewChild('formContractRef', { read: FormContractsComponent})
    private readonly testServ = inject(TestService);
    actionsDetail: BarActions = {
        edit: true,
        delete: true,
        clean: true
    }
    actionsUpdate: BarActions = {
        update: true,
        return: true
    }
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

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.formContractRef()?.reset();;
    }

    save() {
        const form = this.formContractRef()?.form;
        if(form?.valid && form) {
            this.swal.loading();
            this.testServ.post(form.value).subscribe({
                next: (data) => {
                    this.swal.formSave('success');
                    // this.formContractRef()?.reset();
                    // this.showTab(1);
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
        }
    }

    showTab(id: number) {
        this.tabController()?.showTab(this.tabsControls[id].idConnect);
    }
}
