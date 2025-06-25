import { Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { domHelper } from '@helpers/index';
import { BtnToggle } from '@interfaces/index';

@Directive({
    standalone: false,
    selector: '[BtnBsToggle]'
})
export class BtnBsToggleDirective {
    private readonly elementRef = inject(ElementRef);
    public idConnect = input<string>('');
    public setRole = input<BtnToggle>(null);
    public isExpanded = input<boolean>(false);

    constructor() {
        afterNextRender(() => {
            this.init();
        });
    }

    init(): void {
        if (this.setRole()) {
            const el = this.elementRef?.nativeElement;
            el.setAttribute('data-bs-target', domHelper.attrId(this.idConnect()));
            el.setAttribute('data-bs-toggle', this.setRole());
            switch (this.setRole()) {
                case 'offcanvas':
                case 'modal':
                    break;
                case 'collapse':
                    el.setAttribute('aria-expanded', this.isExpanded());
                    el.setAttribute('aria-controls', this.idConnect());
                    break;
            }
        }
    }
}
