import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
  selector: 'table-contracts',
  standalone: true,
  imports: [CommonModule, BladeTableComponent, ButtonComponent],
  templateUrl: './table-contracts.component.html'
})
export class TableContractsComponent {

}
