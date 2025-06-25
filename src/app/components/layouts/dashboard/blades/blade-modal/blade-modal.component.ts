import { NgClass } from '@angular/common';
import { Component, ElementRef, afterNextRender, computed, input, viewChild } from '@angular/core';
import { UiSize } from '@interfaces/index';

@Component({
    selector: 'blade-modal',
    standalone: true,
    imports: [NgClass],
    templateUrl: './blade-modal.component.html'
})
export class BladeModalComponent {
    private modal = viewChild<ElementRef>('modal');
    public idConnect = input.required<string>();
    public setSize = input<UiSize>(null);
    public disableStatic = input(true);
    public disableScrollable = input(false);
    public disableCenter = input(true);
    public disableFade = input(false);
    public disableFullscreen = input(true);
    public hideFooter = input<boolean>(false);
    public hideHeader = input<boolean>(false);

    modalSize = computed(() => !this.setSize() ? `modal-${this.setSize()}` : '');
    scrollable = computed(() => !this.disableScrollable() ? 'modal-dialog-scrollable' : '');
    modalCenter = computed(() => !this.disableCenter() ? 'modal-dialog-centered' : '');
    fullscreen = computed(() => !this.disableFullscreen() ? 'modal-fullscreen' : '');
    fade = computed(() => !this.disableFade() ? 'fade' : '');
    uiContentModal = computed(() => !this.disableFullscreen() ? 'fade' : '');

    constructor() {
        afterNextRender(() => {
            if(!this.disableStatic()) {
                const el = this.modal()?.nativeElement as HTMLElement;
                el.setAttribute('data-bs-backdrop', 'static')
                el.setAttribute('data-bs-keyboard', 'false')
            }
        })
    }
}
