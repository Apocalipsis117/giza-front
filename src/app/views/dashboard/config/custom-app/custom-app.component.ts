import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppMenu, tabsControls } from '@interfaces/index';
import { BladeBoxCollapseComponent } from '@layouts/dashboard/blades/blade-box-collapse/blade-box-collapse.component';
import { BladeCollapseBlockComponent } from '@layouts/dashboard/blades/blade-collapse-block/blade-collapse-block.component';
import { CustomAppColorsComponent } from './custom-app-colors/custom-app-colors.component';
import { RxAppGisaService } from '@services/app';

@Component({
    selector: 'custom-app',
    standalone: true,
    imports: [
        BladeCollapseBlockComponent,
        BladeBoxCollapseComponent,
        CustomAppColorsComponent,
        ReactiveFormsModule
    ],
    templateUrl: './custom-app.component.html'
})
export class CustomAppComponent {
    private readonly appGisa$ = inject(RxAppGisaService);
    menuUi = new FormControl('');
    collapseControl: tabsControls[] = [
        {
            active: true,
            idConnect: 'collapse-2795-4cc7-a1b8-bbc6f30c1733',
            label: 'Colores',
            icon: 'icofont-paint-brush',
            sublabel: 'Personaliza los colores y énfasis de la aplicación'
        },
        {
            active: false,
            idConnect: 'collapse-34bf-4d03-b4bb-11db1550e887',
            label: 'Fuente',
            icon: 'icofont-text-height',
            sublabel: 'Modifica la lectura'
        }
    ];

    ngOnInit(): void {
        this.menuUi.valueChanges.subscribe(value => {
            if(value) {
                console.log("value", value);
                this.appGisa$.changeMenu(value as AppMenu)
            }
        })
    }
}
