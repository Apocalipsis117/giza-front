import { Component, computed, input } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { patientsApp } from '@interfaces/index';
import { PipesModule } from '@pipes/module';

@Component({
    selector: 'card-table-patient',
    standalone: true,
    imports: [PipesModule, DirectivesModule],
    templateUrl: './card-table-patient.component.html'
})
export class CardTablePatientComponent {
    data = input<patientsApp | null>(null);

    name = computed(() => {
        return this.data() ? this.data()?.name : 'Maleja Ferreira';
    });

    avatar = computed(() => {
        return this.data() ? this.data()?.avatar : 'assets/img/ui/avatar-f-3.jpg';
    });

    gender = computed(() => {
        const gender = this.data() ? this.data()?.gender : 'f';
        return gender === 'f' ? 'Femenino' : 'Masculino';
    });

    age = computed(() => {
        return this.data() ? this.data()?.age : 0;
    });
}
