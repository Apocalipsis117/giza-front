import { Component, effect, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '@directive/module';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { BladeBoxCollapseComponent } from '@layouts/dashboard/blades/blade-box-collapse/blade-box-collapse.component';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeCollapseBlockComponent } from '@layouts/dashboard/blades/blade-collapse-block/blade-collapse-block.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { EmployeesFormAuthComponent } from './employees-form-auth/employees-form-auth.component';
import { EmployeesFormBasicComponent } from './employees-form-basic/employees-form-basic.component';
import { collapseControl_employees, tabsControls_employees } from './employees.env';

@Component({
    selector: 'view-employees',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule,
        EmployeesFormBasicComponent,
        BladeCollapseBlockComponent,
        BladeBoxCollapseComponent,
        EmployeesFormAuthComponent,
        InputPanelCheckboxComponent,
        FormsModule
    ],
    templateUrl: './employees.component.html'
})
export class EmployeesComponent {
    readonly collpaseController = viewChild('collpaseController', { read: BladeBoxCollapseComponent });
    tabsControls = tabsControls_employees;
    collapseControl = collapseControl_employees;
    activeFormAuth = signal<boolean>(false);
    activeFormContract = signal<boolean>(false);

    constructor() {
        effect(() => {
            if(!this.activeFormAuth()) this.FormPresServ('hide')
            else this.FormPresServ('show')
        })
        effect(() => {
            if(!this.activeFormContract()) this.FormContract('hide')
            else this.FormContract('show')
        })
    }

    collapseBasic() {
        this.collpaseController()?.show(this.collapseControl[0].idConnect);
    }

    FormPresServ(action: 'hide' | 'show') {
        const connect = this.collapseControl[1].idConnect;
        if(action === 'show') {
            this.collpaseController()?.show(connect);
        }
        else {
            this.collpaseController()?.hide(connect);
        }
    }

    FormContract(action: 'hide' | 'show') {
        const connect = this.collapseControl[2].idConnect;
        if(action === 'show') {
            this.collpaseController()?.show(connect);
        }
        else {
            this.collpaseController()?.hide(connect);
        }
    }
}
