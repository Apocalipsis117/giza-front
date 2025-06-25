import { Component } from '@angular/core';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';

@Component({
    selector: 'external-consultation',
    standalone: true,
    templateUrl: './external-consultation.component.html',
    imports: [
        BladePanelComponent
    ]
})
export class ExternalConsultationComponent {

}
