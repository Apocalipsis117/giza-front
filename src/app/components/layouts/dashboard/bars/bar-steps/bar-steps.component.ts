import { Component, effect, input, output, signal } from '@angular/core';
import { StepAction } from '@interfaces/index';

@Component({
  selector: 'bar-steps',
  imports: [],
  templateUrl: './bar-steps.component.html'
})
export class BarStepsComponent {
    public onStep = output<string>();
    public readonly setActive = input<string | number>('');
    public readonly setSteps = input<StepAction[]>([]);
    active = signal<string | number>('');

    constructor() {
        effect(() => {
            const current = this.setActive();
            this.active.set(current);
        });
    }

    emit(step: StepAction) {
        this.onStep.emit(step.action);
    }

}
