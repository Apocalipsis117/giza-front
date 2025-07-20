import { Component, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuShortcutShortcutMenu } from '@interfaces/index';
import { PipesModule } from '@pipes/module';
import { AppMenuService } from '@services/app';

@Component({
    selector: 'tabs-panel-home',
    standalone: true,
    imports: [
        PipesModule,
        RouterLinkActive,
        RouterLink
    ],
    templateUrl: './tabs-panel-home.component.html'
})
export class TabsPanelHomeComponent {
    public readonly shortcut = input<string>('panel');
    menu = signal<MenuShortcutShortcutMenu[]>([]);
    private readonly appMenu$ = inject(AppMenuService);

    ngOnInit(): void {
        this.appMenu$.menuViews(this.shortcut()).subscribe(data => {
            console.log("data", data);
            this.menu.set(data);
        });
    }
}
