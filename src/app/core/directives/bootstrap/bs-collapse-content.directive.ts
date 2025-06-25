import { Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { domHelper } from '@helpers/index';

@Directive({
    standalone: false,
    selector: '[bsCollapseContent]'
})
export class BsCollapseContentDirective {
    public idConnect = input<string>('');
    public idParent = input<string>('');
    public isActive = input<boolean>(false);
    private readonly elementRef = inject(ElementRef);

    constructor() {
        afterNextRender(() => {
            this.init();
        });
    }

    init(): void {
        const el = this.elementRef?.nativeElement;
        el.setAttribute('id', this.idConnect());
        el.classList.add('collapse');
        if (this.isActive()) el.classList.add('show');
        if (this.idParent()) el.setAttribute('data-bs-parent', domHelper.attrId(this.idParent()));
    }
}
