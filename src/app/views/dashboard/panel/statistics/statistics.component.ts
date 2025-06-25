import { Component } from '@angular/core';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsPanelsComponent } from '@layouts/dashboard/blades/blade-tabs-panels/blade-tabs-panels.component';

@Component({
  selector: 'view-statistics',
  standalone: true,
  imports: [
    BladePanelComponent,
    BladeTabsPanelsComponent
],
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent {

}
