import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuShortcutShortcutMenu } from '@interfaces/index';
import { BtnTabControllerComponent } from '@layouts/dashboard/btns/btn-tab-controller/btn-tab-controller.component';
import { PipesModule } from '@pipes/module';
import { RxShareService, RxTabsControllerService } from '@services/app';

@Component({
    selector: 'tabs-controller',
    standalone: true,
    imports: [CommonModule, BtnTabControllerComponent, PipesModule],
    templateUrl: './tabs-controller.component.html'
})
export class TabsControllerComponent {
    private readonly tabsController = inject(RxTabsControllerService);
    private readonly rxShare = inject(RxShareService);
    router = inject(Router);
    tabs = signal<MenuShortcutShortcutMenu[]>([]);
    activePlus = signal<boolean>(false);
    goPath = signal<string>('/');

    cssActive = computed(() => this.activePlus() ? 'active' : '')

    ngOnInit(): void {
        this.stateTabs()
    }

    stateTabs(){
        this.tabsController.getTabs.subscribe(data => {
            this.tabs.set(data);
            const tabActive = this.tabs().find(tab => tab.active);
            if(tabActive){
                this.rxShare.changeView(tabActive)
                this.router.navigate([tabActive?.path]);
                this.activePlus.set(false)
            } else {
                this.activePlus.set(true)
            }
        })
        this.rxShare.watchShare.subscribe({
            next: (value) => {
                this.goPath.set(value.goPath)
            }
        })
    }

    deleteTab(uuid: string) {
        this.tabsController.deleteTab(uuid);
    }

    go() {
        this.tabsController.defuseTabs();
        this.router.navigate([this.goPath()]);
    }
}
