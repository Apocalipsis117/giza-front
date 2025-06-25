import { Component } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { tabsControls } from '@interfaces/index';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { FormPersonalInjuriesComponent } from "./form-personal-injuries/form-personal-injuries.component";

@Component({
    selector: 'personal-injuries',
    standalone: true,
    templateUrl: './personal-injuries.component.html',
    imports: [
        BladePanelComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule,
        FormPersonalInjuriesComponent
    ]
})
export class PersonalInjuriesComponent {
    tabs: tabsControls[] = [
        {
            active: false,
            idConnect: 'injuries',
            label: 'Lesiones'
        },
        {
            active: true,
            idConnect: 'new-injuries',
            label: 'Nueva'
        }
    ];
}
