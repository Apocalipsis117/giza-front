// animations.ts
import { trigger, transition, style, animate } from '@angular/animations';

export const slideInAnimation = trigger('slideInAnimation', [
    transition(':enter', [
        style({ transform: 'translateX(1rem)', opacity: 0 }),
        animate('150ms ease-in', style({ transform: 'translateX(0)', opacity: 1 }))
    ]),
    transition(':leave', [
        animate('150ms ease-in', style({ transform: 'translateX(1rem)', opacity: 0 }))
    ])
]);
