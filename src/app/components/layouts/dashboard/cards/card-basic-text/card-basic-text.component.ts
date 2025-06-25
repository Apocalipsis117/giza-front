import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ColorsTailwind } from '@interfaces/index';

@Component({
    selector: 'card-basic-text',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './card-basic-text.component.html'
})
export class CardBasicTextComponent {
    setColor = input<ColorsTailwind>('default');
    setTitle = input<string>('title');
    setIcon = input<string>('icofont-home');
    setText = input<string>('description');

    bgColor = computed(() => {
        return `bg-${this.setColor()}-100`;
    });

    textColor = computed(() => {
        return `text-${this.setColor()}-600`;
    });
}
