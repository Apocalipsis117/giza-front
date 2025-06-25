import { Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { eventHelper, uiEffect } from '@helpers/index';

@Directive({
    standalone: false,
    selector: '[effectBumbble]',
    host: {
        '(click)': 'click($event)'
    }
})
export class EffectBumbbleDirective {
    private readonly elRef = inject(ElementRef);
    yuca = 'papaya';
    public selector = input<string>('', { alias: 'selectorName' });
    public contrast = input<'light' | 'dark' | 'default'>('default', { alias: 'effectContrast' });
    el = this.elRef.nativeElement;

    constructor() {
        afterNextRender(() => {
            this.viewInit();
        });
    }

    viewInit() {
        if (this.contrast() !== 'default') {
            this.el.classList.add('effect-' + this.contrast());
        }
    }

    click(e: any) {
        const handle = eventHelper.handleClick(e, {
            closest: this.selector() ? this.selector() : 'button'
        });
        uiEffect.bumbble(this.el, {
            sizeEnd: handle.elementSize.width,
            posX: handle.relativePosition.x,
            posY: handle.relativePosition.y
        });
    }
}
