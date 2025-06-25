import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { queryData } from '@helpers/index';
import { MenuShortcutShortcutMenu } from '@interfaces/index';
import { RxShareService, RxTabsControllerService } from '@services/app';

@Component({
    selector: 'btn-shortcut',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './btn-shortcut.component.html'
})
export class BtnShortcutComponent {
    private readonly rxTabsController = inject(RxTabsControllerService);
    private readonly rxShare = inject(RxShareService);
    public index = input(0, { transform: (value: number) => value + 1 });

    public data = input<MenuShortcutShortcutMenu | null>(null);
    max = signal(14);

    title = computed(() => {
        const title = this.lang()?.title || '';
        return this.data() ? title : 'Title';
    });

    icon = computed(() => this.data() ? this.data()?.icon : 'icofont-ui-image');

    color = computed(() => {
        return this.index() ? queryData.getColorByIndex(this.index()) : 'text-default-600';
    });

    countLetters = computed(() => {
        const size = this.data() ? this.title().length : this.max();
        return size > this.max() ? 'text-xl' : 'text-2xl';
    });

    hasPath = computed(() => this.data() ? this.data()?.path === '' : false);

    path = computed(() => this.data() ? this.data()?.path : '/dashboard/panel/home');

    private lang = computed(() => this.data()?.display?.find(x => x.lang === 'es'));

    addTab() {
        if (this.data()) {
            this.rxTabsController.addTab({
                ...this.data()!,
                active: true
            })
            this.rxShare.changeView(this.data()!)
        }
    }
}
