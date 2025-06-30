import {
    Component,
    computed,
    effect,
    ElementRef,
    inject,
    Input,
    Renderer2,
    signal
} from '@angular/core';

@Component({
    selector: 'app-card-col',
    imports: [],
    template: '<ng-content>'
})
export class CardColComponent {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    private _col = signal<string | number | null>(null);
    @Input()
    set col(val: string | number | null) {
        this._col.set(val);
    }
    get col() {
        return this._col();
    }

    // Devuelve la clase col-span-* de Tailwind, entre col-span-1 y col-span-12
    readonly colSpanClass = computed(() => {
        const value = Number(this._col()) || 1;
        const clamped = Math.max(1, Math.min(12, value));
        return `col-span-${clamped}`;
    });

    ngAfterViewInit() {
        const parent = this.renderer.parentNode(this.el.nativeElement);
        const colDiv = this.renderer.createElement('div');

        this.renderer.addClass(colDiv, this.colSpanClass());
        this.renderer.addClass(colDiv, 'ng-col');

        // Pasar el contenido proyectado al nuevo div
        const childNodes = Array.from(this.el.nativeElement.childNodes);
        for (const node of childNodes) {
            this.renderer.appendChild(colDiv, node);
        }

        // Insertar y eliminar el host
        this.renderer.insertBefore(parent, colDiv, this.el.nativeElement);
        this.renderer.removeChild(parent, this.el.nativeElement);

        // Reactividad: si cambia col, cambia la clase
        effect(() => {
            // Limpia clases col-span-*
            for (let i = 1; i <= 12; i++) {
                this.renderer.removeClass(colDiv, `col-span-${i}`);
            }
            this.renderer.addClass(colDiv, this.colSpanClass());
        });
    }
}