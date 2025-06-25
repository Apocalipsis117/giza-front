import { Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { domHelper } from '@helpers/index';

@Directive({
    standalone: false,
    selector: '[bsOffcanvasBtn]'
})
export class BsOffcanvasBtnDirective {
    public idConnect = input<string>('');
    private readonly elementRef = inject(ElementRef);

    constructor() {
        afterNextRender(() => {
            this.init();
        });
    }

    init(): void {
        const el = this.elementRef?.nativeElement;
        el.setAttribute('data-bs-toggle', 'offcanvas');
        el.setAttribute('data-bs-target', domHelper.attrId(this.idConnect()));
    }
}
