import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ColorsTailwind } from '@interfaces/index';

@Component({
    selector: 'card-basic-data',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './card-basic-data.component.html'
})
export class CardBasicDataComponent {
    setTheme = input<ColorsTailwind>('default');
    setTitle = input<string>('Title');
    setQuantity = input<number>(0);
    setIcon = input<string>('icofont-users');

    theme = computed(() => {
        const colors = [
            {
                color: 'default',
                card: 'bg-default-100 border-default-200',
                icono: 'bg-default-200 text-default-600',
            },
            {
                color: 'red',
                card: 'bg-red-100 border-red-200',
                icono: 'bg-red-200 text-red-600',
            },
            {
                color: 'yellow',
                card: 'bg-yellow-100 border-yellow-200',
                icono: 'bg-yellow-200 text-yellow-600',
            },
            {
                color: 'green',
                card: 'bg-green-100 border-green-200',
                icono: 'bg-green-200 text-green-600',
            },
            {
                color: 'blue',
                card: 'bg-blue-100 border-blue-200',
                icono: 'bg-blue-200 text-blue-600',
            },
            {
                color: 'indigo',
                card: 'bg-indigo-100 border-indigo-200',
                icono: 'bg-indigo-200 text-indigo-600',
            },
            {
                color: 'purple',
                card: 'bg-purple-100 border-purple-200',
                icono: 'bg-purple-200 text-purple-600',
            },
            {
                color: 'pink',
                card: 'bg-pink-100 border-pink-200',
                icono: 'bg-pink-200 text-pink-600',
            }
        ];
        return colors.find(color => color.color === this.setTheme());
    })
}
