import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { AppMenu, DataMenuAside } from '@interfaces/index';
import { MenuAsideUlComponent } from '../menu-aside-ul/menu-aside-ul.component';
import { AppMenuService, RxAppGisaService } from '@services/app';
import { distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'menu-aside',
    standalone: true,
    imports: [CommonModule, MenuAsideUlComponent, NgClass],
    templateUrl: './menu-aside.component.html'
})
export class MenuAsideComponent implements OnInit {
    private readonly appMenu$ = inject(AppMenuService);
    private readonly appGisa$ = inject(RxAppGisaService);
    menuUi = signal<AppMenu>('menu-aside');
    asideMenuData = signal<DataMenuAside>({
        navegation: [],
        setting: []
    });

    ngOnInit(): void {
        const data = this.appMenu$.menu;
        this.asideMenuData.set(data);

        this.appGisa$.watchConfig.pipe(distinctUntilChanged((prev, curr) => prev.menu === curr.menu)).subscribe({
            next: (value) => {
                this.menuUi.set(value.menu)
            }
        })
    }
}
