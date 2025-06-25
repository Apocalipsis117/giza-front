import { Component, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { PaginatorTable } from '@helpers/app/paginatorTable';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';
import { DropdownActionsComponent } from '@layouts/shared/dropdown-actions/dropdown-actions.component';
import { LoadSpinnerBlockComponent } from '@layouts/shared/load-spinner-block/load-spinner-block.component';

@Component({
    selector: 'table-roles',
    standalone: true,
    imports: [
        BladeTableComponent,
        BadgeStatusComponent,
        DirectivesModule,
        DropdownActionsComponent,
        LoadSpinnerBlockComponent
    ],
    templateUrl: './table-roles.component.html'
})
export class TableRolesComponent {
    tdSelected = signal<number>(-1);

    controlPaginator = signal<PaginatorTableI>({
        page: 1,
        paginates: 5,
        sortBy: 'name'
    });

    currentPageData = new PaginatorTable([], 5);

    selectTr(id: number) {
        this.tdSelected.set(id);
    }

    get paginator() {
        return this.currentPageData.getCurrentPageData();
    }

    nextPage(){
        console.log("nextPage");
        this.currentPageData.goToNextPage()
    }

    prevtPage(){
        console.log("prevtPage");
        this.currentPageData.goToPreviousPage()
    }
}


interface PaginatorTableI {
    page: number;
    paginates: number;
    sortBy: string;
}