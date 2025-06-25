import { Component, inject, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { StepSteps } from '@interfaces/index';
import { PipesModule } from '@pipes/module';
import { AppMenuService } from '@services/app';

@Component({
    selector: 'blade-steps',
    standalone: true,
    imports: [PipesModule, DirectivesModule],
    templateUrl: './blade-steps.component.html'
})
export class BladeStepsComponent {
    private readonly appService = inject(AppMenuService);
    steps = signal<StepSteps[]>([]);

    ngOnInit(): void {
        const data = this.appService.steps;
        this.steps.set(data);
    }
}
