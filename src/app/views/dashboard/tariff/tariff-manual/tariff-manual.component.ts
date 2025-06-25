import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { FormReportsComponent } from '@layouts/dashboard/forms/form-reports/form-reports.component';
import { FormTariffComponent } from '@layouts/dashboard/forms/form-tariff/form-tariff.component';
import { TableCupsComponent } from '@layouts/dashboard/tables/table-cups/table-cups.component';

@Component({
    selector: 'app-tariff-manual',
    standalone: true,
    imports: [
        CommonModule,
        BladeBoxPanelComponent,
        FormTariffComponent,
        FormReportsComponent,
        TableCupsComponent,
        BladePanelComponent
    ],
    templateUrl: './tariff-manual.component.html'
})
export class TariffManualComponent {

}
