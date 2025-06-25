import { NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavegationMenuAside } from '@interfaces/index';
import { RxShareService, RxTabsControllerService } from '@services/app';

@Component({
    selector: 'menu-aside-ul',
    standalone: true,
    imports: [NgClass, RouterLink, RouterLinkActive],
    templateUrl: './menu-aside-ul.component.html'
})
export class MenuAsideUlComponent {
    private readonly router = inject(Router);
    private readonly rxShare = inject(RxShareService);
    private readonly tabController = inject(RxTabsControllerService);
    public items = input<NavegationMenuAside[]>([]);

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const segments = event.urlAfterRedirects.split('/').filter(Boolean);

                if (segments.length > 1) {
                    const name = segments[1];
                    const section = this.items().find(item => item.name === name)
                    if(section) {
                        this.rxShare.updatePath(section.path)
                        this.rxShare.changeSection(section);
                    }
                } else {
                    console.log('No se encontró el segundo segmento de la URL.');
                }
            }
        });
    }

    change(item: NavegationMenuAside) {
        this.tabController.defuseTabs();
        this.rxShare.changeSection(item);
        this.rxShare.changeView(null);
    }
}
