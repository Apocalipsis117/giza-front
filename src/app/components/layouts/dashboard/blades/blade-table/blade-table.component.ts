import { Component, computed, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PageAPI } from '@interfaces/extend.i';
import { PanelPaginateComponent } from '@layouts/dashboard/panels/panel-paginate/panel-paginate.component';

@Component({
    selector: 'blade-table',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        PanelPaginateComponent
    ],
    templateUrl: './blade-table.component.html'
})
export class BladeTableComponent {
    public readonly search = output<string>();
    public readonly onPage = output<any>();
    public setData = input<PageAPI<any> | null>(null);
    public headDivider = input<boolean>(true);
    public bodyXDivider = input<boolean>(false);
    public bodyYDivider = input<boolean>(true);
    public hover = input<boolean>(false);
    public rounded = input<boolean>(false);
    public tableSize = input<string>('');
    public hiddeHeader = input<boolean>(false);
    public loadingData = input<boolean>(false);
    public colspan = input<number>(1);

    hdivider = computed(() => this.headDivider() ? 'head-divide' : '');
    bxdivider = computed(() => this.bodyXDivider() ? 'body-divide-x' : '');
    bydivider = computed(() => this.bodyYDivider() ? 'body-divide-y' : '');
    trHover = computed(() => this.hover() ? 'tr-hover' : '');
    size = computed(() => this.tableSize() ? `table-${this.tableSize()}` : '');
    tableRounded = computed(() => this.rounded() ? 'rounded-lg overflow-hove' : '');

    loadContent = computed(() => this.setData() ? this.setData()!.content.length > 0 : false)

}
