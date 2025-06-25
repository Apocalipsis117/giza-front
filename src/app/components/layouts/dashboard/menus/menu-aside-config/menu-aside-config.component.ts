import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { MenuShortcutShortcutMenu } from '@interfaces/index';
import { BladeBoxUiComponent } from '@layouts/dashboard/blades/blade-box-ui/blade-box-ui.component';
import { PipesModule } from '@pipes/module';
import { AppMenuService } from '@services/app';

@Component({
    selector: 'menu-aside-config',
    standalone: true,
    imports: [
        PipesModule,
        InputPanelTextComponent,
        BladeBoxUiComponent,
        RouterLinkActive,
        RouterLink,
        NgClass
    ],
    templateUrl: './menu-aside-config.component.html'
})
export class MenuAsideConfigComponent {
    private readonly menu$ = inject(AppMenuService);

    public menuConfig = signal<MenuShortcutShortcutMenu[]>([]);

    constructor() {
        const menu = this.menu$.menuConfig;
        this.menuConfig.set(menu);
    }
}
