# Color estatus tootle

cambia el color segun true | false

## Directiva

`ng g directive core/directives/app/color-status-toogle`
__important:__ tener module

```ts
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[ColorStatusToogle]'
})
export class ColorStatusToogleDirective {
    @Input() setStatus: boolean = false;

    constructor(
        private elementRef: ElementRef
    ) {}
    ngAfterViewInit(): void {
        const el = this.elementRef.nativeElement;
        const color = this.setStatus ? 'green' : 'gray';
        el.classList.add(color)
    }

}
```

## Implementar

```html
@for(item of items; track rol.id) {
    <div ColorStatusToogle [setStatus]="true"/>
}
```