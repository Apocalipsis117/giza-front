import { Component, computed, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IForm, OptionsForm } from '@interfaces/index';
// inputs
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { GroupSoatService, TypeServiceService } from '@services/api';
import { TestService } from '@services/app';

@Component({
    selector: 'form-ripconcept',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent,
        // other
        ReactiveFormsModule
    ],
    templateUrl: './form-ripconcept.component.html'
})
export class FormRipconceptComponent {
    setForm = input<FormGroup<IForm<any>>>();
    testServ = inject(TestService);
    typeService$ = inject(TypeServiceService);
    GroupSoat$ = inject(GroupSoatService);
    options = signal<OptionsForm[]>([]);
    optionsTypeServ = signal<OptionsForm[]>([]);
    optionsGroupSoat = signal<OptionsForm[]>([]);

    form = computed(() => this.setForm() as FormGroup);

    ngOnInit(): void {
        this.testServ.getOptions('options').subscribe(data => this.options.set(data));
        this.typeService$.getAll('options').subscribe(data => this.optionsTypeServ.set(data));
        this.GroupSoat$.getAll('options').subscribe(data => this.optionsGroupSoat.set(data));
    }
}
