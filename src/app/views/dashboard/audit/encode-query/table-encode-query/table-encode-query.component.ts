import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { FormEncodeQueryComponent } from '../form-encode-query/form-encode-query.component';

@Component({
    selector: 'table-encode-query',
    standalone: true,
    imports: [BladeTableComponent, FormEncodeQueryComponent],
    templateUrl: './table-encode-query.component.html'
})
export class TableEncodeQueryComponent {

}
