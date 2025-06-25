import { Component, input } from '@angular/core';
import { slideInAnimation } from '@animations/index';
import { BarToolsComponent } from '@layouts/dashboard/bars/bar-tools/bar-tools.component';
import { BarUserSigninComponent } from '@layouts/dashboard/bars/bar-user-signin/bar-user-signin.component';

@Component({
    selector: 'blade-panel',
    standalone: true,
    templateUrl: './blade-panel.component.html',
    imports: [BarUserSigninComponent, BarToolsComponent],
    animations: [slideInAnimation]
})
export class BladePanelComponent {
    public disabledTools = input<boolean>(false);
    public disabledUse = input<boolean>(false);
    public hiddeTools = input<boolean>(false);
    public disableAnimation = input<boolean>(false);
}
