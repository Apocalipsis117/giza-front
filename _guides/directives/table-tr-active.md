# Elemento HTML seleccionado

evento que activa un elemento en una lista de elementos

## DIrective

`ng g directive core/directives/app/el-selected`
__important:__ tener module

```ts
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[TrSelected]'
})
export class TrSelectedDirective {
    @Input({ required: true }) id!: number;
    @Input({ required: true }) idx!: number;
    el: any;
    classActive = 'active';

    constructor(
        private elementRef: ElementRef
    ) {}

    ngOnChanges() {
        if (this.el) {
            if (this.idx === this.id) {
                this.el.classList.add(this.classActive)
            } else {
                this.el.classList.remove(this.classActive)
            }
        }
    }
    ngAfterViewInit(): void {
        this.el = this.elementRef.nativeElement;
        this.el.classList.add('transition-colors');
    }
}
```

## Implementar

```ts
import { DirectivesModule } from '@directive/module';

@Component({
    imports: [
        DirectivesModule
    ]
})
export class MyComponent {
    items = [{ id: 1 }, { id: 2 }];
    tdSelected = signal<number>(-1);

    selectTr(id: number) {
        this.tdSelected.set(id);
    }
}
```

```html
@for(item of items; track rol.id) {
    <div TrSelected [idx]="tdSelected()" [id]="rol.id" (click)="selectTr(rol.id)"/>
}
```
