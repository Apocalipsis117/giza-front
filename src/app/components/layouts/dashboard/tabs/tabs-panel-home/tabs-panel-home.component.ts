import { Component, inject, signal } from '@angular/core';
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
    menu = signal<MenuShortcutShortcutMenu[]>([]);
    private readonly appMenu$ = inject(AppMenuService);

    ngOnInit(): void {
        this.appMenu$.menuShorcut('home').subscribe(data => {
            this.menu.set(data);
        });
    }
}
