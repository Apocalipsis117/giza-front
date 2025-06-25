import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelSwitchComponent } from '@form-control/input-panel-switch/input-panel-switch.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { OptionsForm } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { RolesControlsService } from '../roles-controls.service';
import { BarToolControllerService, SweetalertService } from '@services/app';

@Component({
    selector: 'form-roles',
    standalone: true,
    templateUrl: './form-roles.component.html',
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent,
        BladeTableComponent,
        InputPanelSwitchComponent,
        InputPanelCheckboxComponent,
        ReactiveFormsModule
    ]
})
export class FormRolesComponent {
    bridge = inject(RolesControlsService);
    swal = inject(SweetalertService);
    barToolService = inject(BarToolControllerService);
    fb = inject(FormBuilder);
    cargosOptions = signal<OptionsForm[]>([]);

    form = this.fb.group({
        cargo_id: ['', [Validators.required]],
        nombre: ['', [Validators.required]],
        description: [''],
        crear: [false],
        editar: [false],
        leer: [false],
        eliminar: [false],
        estado: [true]
    });

    ngOnInit(): void {
        this.barToolService.action.subscribe(data => {
            if (data === 'save') {
                this.save();
            }
        })
    }

    save() {
        if (this.form.valid) {
            console.log(this.form.value);
        }
    }

    reset() {
        this.form.patchValue({
            cargo_id: '',
            crear: false,
            description: '',
            editar: false,
            eliminar: false,
            estado: true,
            leer: false,
            nombre: ''
        })
    }
}
