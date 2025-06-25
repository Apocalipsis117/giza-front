import { Component, inject } from '@angular/core';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { MenuShortcutComponent } from '@layouts/dashboard/menus/menu-shortcut/menu-shortcut.component';

@Component({
  selector: 'shortcut-audit',
  standalone: true,
  imports: [BladePanelComponent, MenuShortcutComponent],
  templateUrl: './shortcut-audit.component.html'
})
export class ShortcutAuditComponent {

}
