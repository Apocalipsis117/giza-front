import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
    standalone: false,
    selector: '[TrSelected]'
})
export class TrSelectedDirective {
    private readonly elRef = inject(ElementRef);
    id = input.required<number>();
    idx = input.required<number>();
    el: any;

    ngOnChanges() {
        if (this.el) {
            if (this.idx() === this.id()) {
                this.el.classList.add('bg-default-200')
            } else {
                this.el.classList.remove('bg-default-200')
            }
        }
    }
    ngAfterViewInit(): void {
        this.el = this.elRef.nativeElement;
        this.el.classList.add('transition-colors');
    }
}
