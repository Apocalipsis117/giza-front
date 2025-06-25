import { Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { domHelper } from '@helpers/index';

@Directive({
    standalone: false,
    selector: '[bsCollapseBtn]'
})
export class BsCollapseBtnDirective {
    private readonly elementRef = inject(ElementRef);
    public idConnect = input<string>('');
    public isActive = input<boolean>(false);

    constructor() {
        afterNextRender(() => {
            this.init();
        });
    }

    init(): void {
        const el = this.elementRef?.nativeElement;
        el.setAttribute('data-bs-toggle', 'collapse');
        el.setAttribute('data-bs-target', domHelper.attrId(this.idConnect()));
        el.setAttribute('aria-expanded', this.isActive());
        el.setAttribute('aria-controls', this.idConnect());
        if(!this.isActive()) el.classList.add('collapsed');
    }
}
