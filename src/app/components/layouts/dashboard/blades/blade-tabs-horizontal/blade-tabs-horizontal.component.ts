import { Component, ElementRef, computed, inject, input, output } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { bsHelper } from '@helpers/app/bsHelper';
import { tabsControls } from '@interfaces/index';

@Component({
    selector: 'blade-tabs-horizontal',
    standalone: true,
    imports: [
        DirectivesModule
    ],
    templateUrl: './blade-tabs-horizontal.component.html'
})
export class BladeTabsHorizontalComponent {
    private readonly elementRef = inject(ElementRef);
    public readonly action = output<tabsControls>();
    public tabsControls = input.required<tabsControls[]>();
    public setTitle = input<string>('');
    public ui = input<'default' | 'clean' | 'gentle-none'>('default');

    boxUi = computed(() => this.ui() !== 'default' ? 'ui-' + this.ui() : '')

    showTab(tabId: string) {
        let el = this.elementRef.nativeElement.querySelector(`#tab-${tabId}`);
        bsHelper.tabAction(el);
    }

    emit(action: tabsControls) {
        this.action.emit(action);
    }
}
