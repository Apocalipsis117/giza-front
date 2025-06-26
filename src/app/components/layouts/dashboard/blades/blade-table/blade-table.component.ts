import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputSelectPageComponent } from '@form-control/input-select-page/input-select-page.component';
import { FormControlOption } from '@interfaces/index';

@Component({
    selector: 'blade-table',
    standalone: true,
    imports: [
        NgClass,
        InputSelectPageComponent,
        ReactiveFormsModule
    ],
    templateUrl: './blade-table.component.html'
})
export class BladeTableComponent {
    public readonly search = output<string>();
    public readonly controlPaginate = output<any>();
    public paginate = input<any | null>(null);
    public activeSearch = input<boolean>(false);
    public headDivider = input<boolean>(true);
    public bodyXDivider = input<boolean>(false);
    public bodyYDivider = input<boolean>(true);
    public hover = input<boolean>(false);
    public rounded = input<boolean>(false);
    public load = input<boolean>(false);
    public ActiveLoad = input<boolean>(false);
    public tableSize = input<string>('');
    optionsSizePage: FormControlOption[] = [{ value: 5, name: '5' }, { value: 10, name: '10' }, { value: 15, name: '15' }, { value: 25, name: '25' }, { value: 50, name: '50' }];
    controlSize = new FormControl(0);
    controlPage = new FormControl(0);

    hdivider = computed(() => this.headDivider() ? 'head-divide' : '');
    bxdivider = computed(() => this.bodyXDivider() ? 'body-divide-x' : '');
    bydivider = computed(() => this.bodyYDivider() ? 'body-divide-y' : '');
    trHover = computed(() => this.hover() ? 'tr-hover' : '');
    size = computed(() => this.tableSize() ? `table-${this.tableSize()}` : '');
    tableRounded = computed(() => this.rounded() ? 'rounded-lg overflow-hove' : '');

    ngOnChanges(): void {
        if (this.paginateData()) {
            this.controlSize.setValue(this.paginateData()!.size);
            this.controlPage.setValue(this.paginateData()!.page);
        }
    }


    paginateData = computed(() => {
        if (this.paginate()) {
            const options: FormControlOption[] = [];
            for (let i = 0; i < this.paginate().totalPages; i++) {
                options.push({ value: i, name: `${i + 1}` });
            }
            return {
                pages: this.paginate().totalPages,
                page: this.paginate().number,
                size: this.paginate().size,
                last: this.paginate().last,
                first: this.paginate().first,
                letterPlural: this.paginate().totalPages > 1 ? 's' : '',
                quantity: this.paginate().totalElements,
                options
            };
        }
        return null;
    });

    emitControlPaginate() {
        const value = {
            page: this.controlPage.value,
            size: this.controlSize.value
        };
        this.controlPaginate.emit(value);
    }

    nextPage() {
        if (!this.paginate().last) {
            this.controlPage.setValue(this.paginateData()!.page + 1);
            this.emitControlPaginate();
        }
    }

    prevPage() {
        if (!this.paginate().first) {
            this.controlPage.setValue(this.paginateData()!.page - 1);
            this.emitControlPaginate();
        }
    }
}
