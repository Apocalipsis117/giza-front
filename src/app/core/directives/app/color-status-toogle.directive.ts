import { Directive, ElementRef, Input, inject } from '@angular/core';

@Directive({
    standalone: false,
    selector: '[ColorStatusToogle]'
})
export class ColorStatusToogleDirective {
    private readonly elementRef = inject(ElementRef);
    @Input() setStatus: boolean = false;

    ngAfterViewInit(): void {
        const el = this.elementRef.nativeElement;
        const color = this.setStatus ? 'text-green-500' : 'text-gray-200';
        el.classList.add(color)
    }

}
