import { NgClass } from '@angular/common';
import { Component, ElementRef, computed, inject, input } from '@angular/core';
import { bsHelper } from '@helpers/app/bsHelper';

@Component({
    selector: 'blade-box-collapse',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './blade-box-collapse.component.html'
})
export class BladeBoxCollapseComponent {
    private readonly ref = inject(ElementRef);
    public idParent = input<string>('');
    public setSpaceY = input<number>(4);

    spaceY = computed(() => `space-y-` + this.setSpaceY())

    show(id: string) {
        const el = this.el(id);
        bsHelper.collapseAction(el);
    }

    hide(id: string) {
        const el = this.el(id);
        bsHelper.collapseAction(el, { action: 'hide' });
    }

    private el(id: string) {
        return this.ref.nativeElement.querySelector('#' + id);
    }
}
