import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { FormControlOption } from '@interfaces/index';
import { BladePanelOptionsComponent } from '@layouts/dashboard/blades/blade-panel-options/blade-panel-options.component';
import { GroupQxService, RipConceptService, ServiceLevelService, ServicesService, TypeAmbitService, TypeBirthService, TypeGenderService } from '@services/api';

@Component({
    selector: 'form-cups',
    standalone: true,
    imports: [
        CommonModule,
        InputPanelTextComponent,
        InputPanelSelectComponent,
        InputPanelCheckboxComponent,
        BladePanelOptionsComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './form-cups.component.html'
})
export class FormCupsComponent {
    public setForm = input<any>();
    levelServ = inject(ServiceLevelService);
    genderServ = inject(TypeGenderService);
    ambitServ = inject(TypeAmbitService);
    birthServ = inject(TypeBirthService);
    servicesServ = inject(ServicesService);
    ripConceptServ = inject(RipConceptService);
    groupQxServ = inject(GroupQxService);

    optionsLevels = signal<FormControlOption[]>([]);
    optionsGender = signal<FormControlOption[]>([]);
    optionsAmbit = signal<FormControlOption[]>([]);
    optionsBirth = signal<FormControlOption[]>([]);
    optionsServices = signal<FormControlOption[]>([]);
    optionsRipConcept = signal<FormControlOption[]>([]);
    optionsGroupqx = signal<FormControlOption[]>([]);

    form = computed(() => this.setForm() as FormGroup);

    ngOnInit(): void {
        this.levelServ.list('options').subscribe(data => this.optionsLevels.set(data));
        this.genderServ.options().subscribe(data => this.optionsGender.set(data));
        this.ambitServ.list('options').subscribe(data => this.optionsAmbit.set(data));
        this.birthServ.getAll('options').subscribe(data => this.optionsBirth.set(data));
        this.ripConceptServ.list('options').subscribe(data => this.optionsRipConcept.set(data));
        this.servicesServ.getAll('options').subscribe(data => this.optionsServices.set(data));
        this.groupQxServ.list('options').subscribe(data => this.optionsGroupqx.set(data));
    }
}
