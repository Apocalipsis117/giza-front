import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
    standalone: false,
    selector: '[TrSelected]'
})
export class TrSelectedDirective {
    private readonly elRef = inject(ElementRef);
    id = input.required<number | string | null>();
    idx = input.required<number | string | null>();
    el: any;

    ngOnChanges() {
        if (this.el) {
            if (this.idx() === this.id()) {
                this.el.classList.add('bg-[var(--color-100)]')
            } else {
                this.el.classList.remove('bg-[var(--color-100)]')
            }
        }
    }
    ngAfterViewInit(): void {
        this.el = this.elRef.nativeElement;
        this.el.classList.add('transition-colors');
    }
}
