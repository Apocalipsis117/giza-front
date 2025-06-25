import { Component, EventEmitter, Output } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { FormReferralAuditComponent } from '../form-referral-audit/form-referral-audit.component';

@Component({
    selector: 'table-referral-audit',
    standalone: true,
    imports: [
        BladeTableComponent,
        FormReferralAuditComponent,
        ButtonComponent
    ],
    templateUrl: './table-referral-audit.component.html'
})
export class TableReferralAuditComponent {
    @Output() action = new EventEmitter();

    tableAction(){
        this.action.emit()
    }
}
