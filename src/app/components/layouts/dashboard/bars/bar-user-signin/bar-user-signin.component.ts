import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DirectivesModule } from '@directive/module';
import { MenuShortcutShortcutMenu, NavegationMenuAside } from '@interfaces/index';
import { DropdownUserActionsComponent } from '@layouts/dashboard/dropdowns/dropdown-user-actions/dropdown-user-actions.component';
import { PipesModule } from '@pipes/module';
import { RxShareService } from '@services/app';

@Component({
    selector: 'bar-user-signin',
    standalone: true,
    imports: [CommonModule, DropdownUserActionsComponent, DirectivesModule, RouterLink, PipesModule],
    templateUrl: './bar-user-signin.component.html'
})
export class BarUserSigninComponent {
    private readonly rxShare$ = inject(RxShareService);
    section = signal<NavegationMenuAside | null>(null);
    view = signal<MenuShortcutShortcutMenu | null>(null);

    ngOnInit(): void {
        this.shareStore();
    }

    shareStore() {
        this.rxShare$.getShare.subscribe({
            next: (value) => {
                this.section.set(value.currentSection);
                this.view.set(value.currentView);
            }
        });
    }

    currentSection = computed(() => ({
        path: this.section() ? this.section()!.path : '/error-http/404',
        icon: this.section() ? this.section()!.icon : '',
        display: this.section() ? this.section()!.display : 'Home',
        name: this.section() ? this.section()!.name : '',
        id: this.section() ? this.section()!.id : ''
    }));

    currentView = computed(() => ({
        display: this.view() ? this.view()!.display : []
    }))
}
