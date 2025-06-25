import { Component } from '@angular/core';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';

@Component({
    selector: 'tdetail-institutions',
    standalone: true,
    imports: [
        BlockSwitchStatusComponent
    ],
    templateUrl: './tdetail-institutions.component.html'
})
export class TdetailInstitutionsComponent {

}
