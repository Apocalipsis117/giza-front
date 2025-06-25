import { Component } from '@angular/core';
import { BladeModalComponent } from '@layouts/dashboard/blades/blade-modal/blade-modal.component';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-note',
    standalone: true,
    imports: [
        BladeModalComponent,
        ButtonComponent
    ],
    templateUrl: './note.component.html'
})
export class NoteComponent {

}
