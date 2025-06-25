import { Component } from '@angular/core';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';

@Component({
    selector: 'general-welcome-info',
    standalone: true,
    imports: [
        CardBasicTextComponent
    ],
    templateUrl: './general-welcome-info.component.html'
})
export class GeneralWelcomeInfoComponent {

}
