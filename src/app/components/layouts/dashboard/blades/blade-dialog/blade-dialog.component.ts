
import { NgClass } from '@angular/common';
import { Component, computed, ElementRef, input, output, viewChild } from '@angular/core';
import { bsHelper } from '@helpers/app/bsHelper';
import { im_uiSize } from '@interfaces/index';

@Component({
    selector: 'blade-dialog',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './blade-dialog.component.html'
})
export class BladeDialogComponent {
    private dialog = viewChild<ElementRef>('dialog');
    public idConnect = input.required<string>();
    public setSize = input<im_uiSize | null>(null);
    public activeStatic = input<boolean>(false);
    public activeScrollable = input<boolean>(false);
    public activeCenter = input<boolean>(false);
    public activeFade = input<boolean>(true);
    public hideFooter = input<boolean>(false);
    public hideheader = input<boolean>(false);
    public isFullscreen = input<boolean>(false);
    public onClose = output<boolean>();

    modalSize = computed(() => this.setSize() ? `modal-${this.setSize()}` : '');
    fullScreen = computed(() => this.isFullscreen() ? 'modal-fullscreen' : '');
    scrollable = computed(() => this.activeScrollable() ? 'modal-dialog-scrollable' : '');
    modalCenter = computed(() => this.activeCenter() ? 'modal-dialog-centered' : '');
    fade = computed(() => this.activeFade() ? 'fade' : '');

    show() {
        bsHelper.dialogAction(this.dialog()?.nativeElement, {
            action: 'show'
        })
    }

    hide() {
        bsHelper.dialogAction(this.dialog()?.nativeElement, {
            action: 'hide'
        })
    }
}
