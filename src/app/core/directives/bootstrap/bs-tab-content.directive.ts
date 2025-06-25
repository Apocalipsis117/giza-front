import { Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

@Directive({
    standalone: false,
    selector: '[bsTabContent]'
})
export class BsTabContentDirective {
    private readonly ref = inject(ElementRef);
    public idConnect = input<string>('');
    public isActive = input<boolean>(false);
    public activeFade = input<boolean>(true);

    constructor() {
        afterNextRender(() => {
            this.viewInit();
        });
    }

    viewInit(): void {
        const el = this.ref?.nativeElement;
        if (this.isActive()) el.classList.add('show', 'active');
        if (this.activeFade()) el.classList.add('fade');
        el.setAttribute('id', this.idConnect());
        el.setAttribute('role', 'tabpanel');
        el.setAttribute('tabindex', '0');
    }
}
