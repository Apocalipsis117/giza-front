import { Component, input, computed, inject, signal } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { DirectivesModule } from '@directive/module';
import { PipesModule } from '@pipes/module';
import { TestService } from '@services/app';

@Component({
    selector: 'medical-agenda-table',
    standalone: true,
    imports: [
        BladeTableComponent,
        ButtonComponent,
        DirectivesModule,
        PipesModule
    ],
    templateUrl: './medical-agenda-table.component.html'
})
export class MedicalAgendaTableComponent {
    private readonly local$ = inject(TestService);
    public dataTable = input<any[]>([]);
    tdSelected = signal<number>(-1);

    load = computed(() => this.dataTable().length > 0);

    emit(data: any) {
        this.tdSelected.set(data.id);
        this.local$.emit(data);
    }

    // optional
    clean() {
        this.tdSelected.set(-1);
        this.local$.emit(null);
    }
}
