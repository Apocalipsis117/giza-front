import { Component, inject, input, signal } from '@angular/core';
import { MenuShortcutShortcutMenu, PanelNameSection } from '@interfaces/index';
import { BtnShortcutComponent } from '@layouts/dashboard/btns/btn-shortcut/btn-shortcut.component';
import { AppMenuService } from '@services/app';

@Component({
    selector: 'menu-shortcut',
    standalone: true,
    imports: [BtnShortcutComponent],
    templateUrl: './menu-shortcut.component.html'
})
export class MenuShortcutComponent {
    private readonly appService = inject(AppMenuService);
    public menu = input<PanelNameSection | null>(null);
    menuShortcut = signal<MenuShortcutShortcutMenu[]>([]);

    ngOnChanges(): void {
        if (this.menu) {
            this.appService.menuShorcut(this.menu()).subscribe(data => {
                this.menuShortcut.set(data);
            })
        }
    }
}
