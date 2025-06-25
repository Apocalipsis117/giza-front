import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-public',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './public.component.html'
})
export class PublicComponent {
}
