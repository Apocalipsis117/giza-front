import { CommonModule } from '@angular/common';
import { Component, Input, computed, input } from '@angular/core';
import { ColorsTailwind, UiSize } from '@interfaces/index';

@Component({
    selector: 'title-icon-section',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './title-icon-section.component.html'
})
export class TitleIconSectionComponent {
    public setTitle = input<string>('');
    public setIcon = input<string>('');
    public setLabel = input<string | undefined>('');
    public setSize = input<UiSize>(null);
    public setColor = input<ColorsTailwind>('neutral');

    color = computed(() => `text-${this.setColor()}-400`)

    uiSize = computed(() => {
        let sizes = [
            {
                size: 'xs',
                title: 'text-sm',
                icon: 'text-normal'
            },
            {
                size: 'sm',
                title: 'text-normal',
                icon: 'text-lg'
            },
            {
                size: 'normal',
                title: 'text-lg',
                icon: 'text-xl'
            },
            {
                size: 'md',
                title: 'text-lg',
                icon: 'text-2xl'
            },
            {
                size: 'lg',
                title: 'text-xl',
                icon: 'text-3xl'
            },
            {
                size: 'xl',
                title: 'text-2xl',
                icon: 'text-4xl'
            }
        ]
        const key = this.setSize() ? this.setSize() : 'normal';
        const size = sizes.find(x => x.size === key)
        return size;
    })
}
