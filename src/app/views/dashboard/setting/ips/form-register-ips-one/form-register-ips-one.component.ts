import { CommonModule } from '@angular/common';
import { Component, ViewChild, computed, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelImgComponent } from '@form-control/input-panel-img/input-panel-img.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { queryData } from '@helpers/index';
import { BasicDataIpsDTO_APP, CitiesOptionForm, IForm, OptionsForm } from '@interfaces/index';
import { ApartmentCitiesService, LevelIpsService, TypeDniIpsService } from '@services/api';
import { LocalIpsService } from '../local-ips.service';
@Component({
    selector: 'form-register-ips-one',
    standalone: true,
    templateUrl: './form-register-ips-one.component.html',
    imports: [
        CommonModule,
        InputPanelTextComponent,
        InputPanelSelectComponent,
        InputPanelImgComponent,
        ReactiveFormsModule,
    ]
})
export class FormRegisterIpsOneComponent {
    @ViewChild('inputLogo') inputLogo!: InputPanelImgComponent;
    // input
    setForm = input<FormGroup<IForm<BasicDataIpsDTO_APP>>>();
    // inject
    levelIps$ = inject(LevelIpsService);
    typeDniIps$ = inject(TypeDniIpsService);
    loca$ = inject(LocalIpsService);
    countries$ = inject(ApartmentCitiesService);
    optionsDepartments = signal<CitiesOptionForm[]>([]);
    optionsCities = signal<OptionsForm[]>([]);
    // signal
    optionslevelIps = signal<OptionsForm[]>([]);
    optionsDniIps = signal<OptionsForm[]>([]);
    // computed
    form = computed(() => this.setForm() as FormGroup);
    logo = computed(() => this.setForm()!.get('ipsLogo'));


    ngOnInit(): void {
        this.levelIps$.getAll('options').subscribe(data => this.optionslevelIps.set(data));
        this.typeDniIps$.getAll('options').subscribe(data => this.optionsDniIps.set(data));
        this.countries$.getAll('options').subscribe(data => this.optionsDepartments.set(data));
        this.changeApartment();
        this.watchEventForm();
    }

    changeApartment() {
        this.setForm()!.get('departmentId')!.valueChanges.subscribe(value => {
            if (value) {
                let cities = queryData.cities(value, this.optionsDepartments());
                this.optionsCities.set(cities)
            }
        })
    }

    changeFile(e: any[]) {
        if (e.length > 0) {
            this.logo()!.setValue(e[0].base64);
        } else {
            this.logo()!.setValue('');
        }
    }

    watchEventForm() {
        this.loca$.watchEventForm.subscribe(data => {
            if (data === 'reset') this.inputLogo.clean();
        });
    }

    get name() {
        return this.setForm()!.get('name')?.value;
    }
}
