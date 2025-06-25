import { Component } from '@angular/core';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { MenuShortcutComponent } from '@layouts/dashboard/menus/menu-shortcut/menu-shortcut.component';

@Component({
    selector: 'shortcut-principal',
    standalone: true,
    imports: [
        BladePanelComponent,
        MenuShortcutComponent
    ],
    templateUrl: './shortcut-principal.component.html'
})
export class ShortcutPrincipalComponent {

}
