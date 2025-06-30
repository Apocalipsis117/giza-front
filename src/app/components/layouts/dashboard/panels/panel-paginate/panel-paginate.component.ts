import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { PageAPI } from '@interfaces/extend.i';
import { FormControlOption } from '@interfaces/index';
import { SweetalertService } from '@services/app';

@Component({
    standalone: true,
    selector: 'panel-paginate',
    imports: [
        FormsModule,
        InputSelectComponent
    ],
    templateUrl: './panel-paginate.component.html'
})
export class PanelPaginateComponent {
    private readonly swa$ = inject(SweetalertService);
    public readonly setPage = input<PageAPI<any>|null>(null);
    public onPage = output<{ size: number; page: number; }>();
    pageSizeOptions: FormControlOption[] = [{ value: 5, name: '5' }, { value: 10, name: '10' }, { value: 25, name: '25' }, { value: 50, name: '50' }];
    pageGo = signal<number>(0);

    size = signal<number>(0);

    ngOnChanges() {
        const size = this.setPage()?.pageSize || 0;
        this.size.set(size);
    }

    totalElements = computed(() => this.setPage() ? this.setPage()?.totalElements : 0)

    navigateToPage(page: number): void {
        if (page >= 0 && page <= this.setPage()!.totalPages) {
            this.onPage.emit({ size: this.size(), page });
        }
    }

    page = computed(() => this.pageGo() - 1)

    go() {
        if(this.page() < this.setPage()!.totalPages) {
            this.navigateToPage(this.page())
        } else {
            const message = 'El numero maximo de paginas es de ' + this.setPage()?.totalPages;
            this.swa$.alertSimple(message, 'info')
        }
    }

    onPageSizeChange(): void {
        this.onPage.emit({ size: this.size(), page: 0 });
    }

    resetPage() {
        this.pageGo.set(0);
    }
}
