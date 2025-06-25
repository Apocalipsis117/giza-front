import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { FormGlossValidityComponent } from '../form-gloss-validity/form-gloss-validity.component';

@Component({
    selector: 'table-gloss-validity',
    standalone: true,
    imports: [BladeTableComponent, FormGlossValidityComponent],
    templateUrl: './table-gloss-validity.component.html'
})
export class TableGlossValidityComponent {

}
