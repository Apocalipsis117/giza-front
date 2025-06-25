import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuShortcutComponent } from '@layouts/dashboard/menus/menu-shortcut/menu-shortcut.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';

@Component({
    selector: 'shortcut-setting',
    standalone: true,
    imports: [CommonModule, BladePanelComponent, MenuShortcutComponent],
    templateUrl: './shortcut-setting.component.html'
})
export class ShortcutSettingComponent {

}
