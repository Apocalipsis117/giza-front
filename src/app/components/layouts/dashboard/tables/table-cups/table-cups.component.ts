import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';

@Component({
  selector: 'table-cups',
  standalone: true,
  imports: [CommonModule, BladeTableComponent],
  templateUrl: './table-cups.component.html'
})
export class TableCupsComponent {

}
