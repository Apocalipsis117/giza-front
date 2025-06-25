import { Component } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { FormCareProgramsComponent } from '@layouts/dashboard/forms/form-care-programs/form-care-programs.component';
import { TableCareProgramsComponent } from '@layouts/dashboard/tables/table-care-programs/table-care-programs.component';

@Component({
    selector: 'care-programs',
    standalone: true,
    templateUrl: './care-programs.component.html',
    imports: [
        BladePanelComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule,
        TableCareProgramsComponent,
        FormCareProgramsComponent
    ]
})
export class CareProgramsComponent {
    tabsControls = [
        {
            idConnect: 'serviceProcedure',
            label: 'Servicios y procedimientos',
            active: true
        },
        {
            idConnect: 'diagnostics',
            label: 'Diagnosicos',
            active: false
        },
        {
            idConnect: 'history',
            label: 'Historia',
            active: false
        }
    ]

}
