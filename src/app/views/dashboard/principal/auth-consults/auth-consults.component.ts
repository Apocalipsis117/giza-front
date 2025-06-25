import { Component, viewChild } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { AuthConsultsTableComponent } from './auth-consults-table/auth-consults-table.component';
import { ActionName, BarActions } from '@interfaces/index';
import { AuthConsultsDetailsComponent } from './auth-consults-details/auth-consults-details.component';

@Component({
    selector: 'auth-consults',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        AuthConsultsTableComponent,
        AuthConsultsDetailsComponent
    ],
    templateUrl: './auth-consults.component.html'
})
export class AuthConsultsComponent {
    readonly table = viewChild('table', { read: AuthConsultsTableComponent});
    barActions: BarActions = {
        edit: true,
        delete: true,
        clean: true
    }

    barAction(e: ActionName) {
        if (e === 'clean') this.table()?.clean();
    }

    cleanTable() {
        this.table()?.clean()
    }
}
