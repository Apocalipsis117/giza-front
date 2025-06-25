import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';

@Component({
    selector: 'table-attention-service',
    standalone: true,
    templateUrl: './table-attention-service.component.html',
    imports: [CommonModule, BladeTableComponent]
})
export class TableAttentionServiceComponent {

}
