import { Component, computed, inject, output, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { PageAPI } from '@interfaces/extend.i';
import { onBtn, Todo } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { BtnsActionComponent } from '@layouts/dashboard/btns/btns-action/btns-table-action.component';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';
import { TodoFake_API } from 'src/app/core/services/todo-fake/todo-fake.i';
import { TodoFakeService } from 'src/app/core/services/todo-fake/todo-fake.service';

@Component({
    selector: 'table-roles',
    standalone: true,
    imports: [
        BladeTableComponent,
        BadgeStatusComponent,
        DirectivesModule,
        BtnsActionComponent,
    ],
    templateUrl: './table-roles.component.html'
})
export class TableRolesComponent {
    public onTable = output<onBtn<Todo>>();
    private todo$ = inject(TodoFakeService);
    paramPaginate = signal<any>(queries.paramsPage);
    dataTable = signal<PageAPI<TodoFake_API> | null>(null);
    tdSelected = signal<number | string>(NaN);
    load = signal<boolean>(false);
    entities = computed(() => this.dataTable() ? this.dataTable()?.content : []);

    ngOnInit(): void {
        this.queryDataTable()
    }

    queryDataTable() {
        this.todo$.page(this.paramPaginate()).subscribe({
            next: (value) => {
                this.dataTable.set(value);
                this.load.set(false);
            }
        })
    }

    clean() {
        this.tdSelected.set(-1);
    }

    paginate(e: any) {
        this.paramPaginate.set(e);
        this.queryDataTable();
    }

    onBtn(data: onBtn<Todo>) {
        this.tdSelected.set(data.value.title);
        this.onTable.emit(data);
    }
}
