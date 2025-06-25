import { NgClass } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuShortcutShortcutMenu } from '@interfaces/index';
import { RxTabsControllerService } from '@services/app';
import { take } from 'rxjs';

@Component({
    selector: 'btn-tab-controller',
    standalone: true,
    imports: [NgClass],
    templateUrl: './btn-tab-controller.component.html'
})
export class BtnTabControllerComponent {
    private readonly tabsController = inject(RxTabsControllerService);
    private readonly router = inject(Router);
    public data = input.required<MenuShortcutShortcutMenu>();
    hasTabs = signal<boolean>(false);

    value = computed(() => ({
        display: this.data() ? this.lang()?.title : '',
        active: this.data()?.active ? 'active' : '',
        icon: this.data() ? this.data()!.icon : ''
    }))

    lang = computed(() => this.data()?.display.find(lang => lang.lang === 'es'));

    deleteTab() {
        this.tabsController.deleteTab(this.data().uuid);
        this.tabsController.getTabs.pipe(take(1)).subscribe(tabs => {
            if(tabs.length === 0) {
                this.router.navigate(['/dashboard/panel/general']);
            }
        })
    }

    toGo() {
        this.tabsController.patchTabActive(this.data().uuid);
        this.router.navigate([this.data().path]);
    }
}
