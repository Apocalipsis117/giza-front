import { NgClass } from '@angular/common';
import { Component, PLATFORM_ID, afterNextRender, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppColor, AppMode } from '@interfaces/index';
import { BladeModalComponent } from '@layouts/dashboard/blades/blade-modal/blade-modal.component';
import { BladeOffcanvasComponent } from '@layouts/dashboard/blades/blade-offcanvas/blade-offcanvas.component';
import { ListNotificationsComponent } from '@layouts/dashboard/lists/list-notifications/list-notifications.component';
import { MenuAsideComponent } from '@layouts/dashboard/menus/menu-aside/menu-aside.component';
import { TabsControllerComponent } from '@layouts/dashboard/tabs/tabs-controller/tabs-controller.component';
import { RxAppGisaService } from '@services/app';
import { Chart, registerables } from 'chart.js';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    imports: [
        RouterOutlet,
        MenuAsideComponent,
        BladeOffcanvasComponent,
        ListNotificationsComponent,
        TabsControllerComponent,
        BladeModalComponent,
        NgClass
    ]
})
export class DashboardComponent {
    private readonly platform = inject(PLATFORM_ID);
    private readonly appGisa = inject(RxAppGisaService);
    appColor = signal<AppColor>('default');
    appMode = signal<AppMode>('light');
    constructor() {
        afterNextRender(() => {
            this.initView()
        })
    }
    ngOnInit(): void {
        this.appGisa.watchAppGisa.subscribe(value => {
            const color = value.config.color;
            const mode = value.config.mode;
            this.appColor.set(color)
            this.appMode.set(mode)
        })
    }

    appTheme = computed(() => ({
        color: 'app-color-' + this.appColor(),
        mode: this.appMode() + '-mode'
    }))

    initView() {
        if(this.platform) {
            Chart.register(...registerables);
        }
    }
}
