import { Component, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputColorsComponent } from '@form-control/input-colors/input-colors.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { State_appGisa } from '@interfaces/app';
import { AppColor, AppMode } from '@interfaces/index';
import { BlockItemConfigComponent } from '@layouts/dashboard/block/block-item-config/block-item-config.component';
import { RxAppGisaService } from '@services/app';
import { optionsColor, optionsColors, optionsMode } from './custom-app-colors.evn';

@Component({
    selector: 'custom-app-colors',
    standalone: true,
    imports: [
        InputPanelSelectComponent,
        BlockItemConfigComponent,
        InputColorsComponent,
        ReactiveFormsModule
    ],
    templateUrl: './custom-app-colors.component.html'
})
export class CustomAppColorsComponent {
    private readonly appGisa$ = inject(RxAppGisaService);
    public appGisa = input<State_appGisa | null>(null);
    appMode = new FormControl('');
    appColor = new FormControl('');

    optionsMode = optionsMode;
    optionsColor = optionsColor;
    optionsColors = optionsColors;

    ngOnChanges(): void {
        if (this.appGisa()) {
            const config = this.appGisa()!.config;
            this.appMode.patchValue(config.mode);
            this.appColor.patchValue(config.color);
        }
    }

    ngOnInit(): void {
        this.initChange();
    }

    initChange() {
        this.appMode.valueChanges.subscribe(value => {
            if (value) {
                this.appGisa$.changeMode(value as AppMode);
            }
        });
        this.appColor.valueChanges.subscribe(value => {
            if (value) {
                this.appGisa$.changeColor(value as AppColor);
            }
        });
    }
}
