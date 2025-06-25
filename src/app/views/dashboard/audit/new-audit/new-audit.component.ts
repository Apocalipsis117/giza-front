import { Component, inject, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { ItemListApp, tabsControls } from '@interfaces/index';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { BtnsAsideComponent } from '@layouts/dashboard/btns/btns-aside/btns-aside.component';
import { FormAuditComponent } from './form-audit/form-audit.component';
import { NewAuditService } from './new-audit.service';
import { TableNewauditDiagnosisComponent } from './table-newaudit-diagnosis/table-newaudit-diagnosis.component';
import { TableNewauditSupportComponent } from './table-newaudit-support/table-newaudit-support.component';

@Component({
    selector: 'new-audit',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule,
        FormAuditComponent,
        BtnsAsideComponent,
        TableNewauditDiagnosisComponent,
        TableNewauditSupportComponent
    ],
    templateUrl: './new-audit.component.html'
})
export class NewAuditComponent {
    local$ = inject(NewAuditService);
    tabs: tabsControls[] = [
        {
            active: true,
            idConnect: 'formAudit',
            label: 'Formulario'
        },
        {
            active: false,
            idConnect: 'diagnosis',
            label: 'Diagnosticos'
        },
        {
            active: false,
            idConnect: 'medium',
            label: 'Soportes'
        }
    ];

    actionsAside = signal<ItemListApp[]>([]);

    ngOnInit(): void {
        const items = this.local$.menuside;
        this.actionsAside.set(items.menuShortcut);
    }

}
