import { Component } from '@angular/core';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { MenuShortcutComponent } from '@layouts/dashboard/menus/menu-shortcut/menu-shortcut.component';

@Component({
    selector: 'shortcut-clinic-history',
    standalone: true,
    templateUrl: './shortcut-clinic-history.component.html',
    imports: [
        BladePanelComponent,
        MenuShortcutComponent
    ]
})
export class ShortcutClinicHistoryComponent {

}
