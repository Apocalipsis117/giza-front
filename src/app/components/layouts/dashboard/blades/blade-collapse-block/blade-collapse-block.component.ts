import { Component, computed, input, output } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { domHelper } from '@helpers/index';
import { UiSize } from '@interfaces/index';
import { TitleIconSectionComponent } from '@layouts/shared/title-icon-section/title-icon-section.component';

@Component({
    selector: 'blade-collapse-block',
    standalone: true,
    imports: [
        TitleIconSectionComponent,
        DirectivesModule
    ],
    templateUrl: './blade-collapse-block.component.html'
})
export class BladeCollapseBlockComponent {
    public idConnect = input.required<string>();
    public onCollapse = output<string>();
    public setTitle = input<string>('Titulo?');
    public setLabel = input<string | undefined>('');
    public setTitleSize = input<UiSize>(null);
    public setIcon = input<string | undefined>('');
    public idParent = input<string>('');
    public isActive = input<boolean>(false);
    public disableCollapse = input<boolean>(false);
    public ui = input<'df' | 'plane'>('df');

    boxUi = computed(() => {
        const ui = [
        {
            name: 'df',
            box: 'ui-i'
        },
        {
            name: 'plane',
            box: 'ui-plane'
        }
        ]
        const select = ui.find(x => x.name === this.ui());
        return select ? select : ui.find(x => x.name === 'df')
    })

    contentShow = computed(() => domHelper.addClassIfAvtive(this.isActive(), 'show'))
    icon = computed(() => this.setIcon() ? this.setIcon()! : '')
    uiDisabled = computed(() => this.disableCollapse() ? 'ui-collapse-disabled' : '')
}
