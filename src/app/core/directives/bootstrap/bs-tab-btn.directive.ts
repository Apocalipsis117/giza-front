import { Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { domHelper } from '@helpers/index';

@Directive({
    standalone: false,
    selector: '[bsTabBtn]'
})
export class BsTabBtnDirective {
    private readonly elementRef = inject(ElementRef);
    public idConnect = input<string>('');
    public isActive = input<boolean>(false);

    constructor() {
        afterNextRender(() => {
            this.viewInit();
        });
    }

    viewInit(): void {
        const el = this.elementRef.nativeElement;
        if (this.isActive()) {
            el.classList.add('active');
        }
        el.setAttribute('data-bs-toggle', 'tab');
        el.setAttribute('id', `tab-${this.idConnect()}`);
        el.setAttribute('role', 'tab');
        el.setAttribute('aria-selected', String(this.isActive));
        el.setAttribute('data-bs-target', domHelper.attrId(this.idConnect()));
        el.setAttribute('arial-id', this.idConnect());
    }
}
