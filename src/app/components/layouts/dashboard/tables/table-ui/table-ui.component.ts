import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'table-ui',
  imports: [],
  templateUrl: './table-ui.component.html'
})
export class TableUiComponent {
    public items = input<any[]>([]);
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
}
