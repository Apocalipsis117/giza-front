import { CommonModule } from '@angular/common';
import { Component, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DirectivesModule } from '@directive/module';
import { ngFormHelper, queries } from '@helpers/index';
import { CupsAPP, CupsAPP_PAGE, CupsDTO_APP } from '@interfaces/app';
import { ActionName, BarActions, IForm, tabsControls } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeBoxTitleComponent } from '@layouts/dashboard/blades/blade-box-title/blade-box-title.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { CupService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormCupsComponent } from './form-cups/form-cups.component';
import { PanelReportsComponent } from './panel-reports/panel-reports.component';
import { TableCupsComponent } from './table-cups/table-cups.component';
import { TdetailCupComponent } from './tdetail-cup/tdetail-cup.component';
import { ValidateStringEmpty } from '@valid-control/index';

@Component({
    selector: 'app-cups',
    standalone: true,
    templateUrl: './cups.component.html',
    imports: [
        CommonModule,
        BladePanelComponent,
        BladeBoxPanelComponent,
        FormCupsComponent,
        BladeBoxTitleComponent,
        PanelReportsComponent,
        TableCupsComponent,
        DirectivesModule,
        BladeTabsHorizontalComponent,
        TdetailCupComponent
    ]
})
export class CupsComponent {
    private readonly swal$ = inject(SweetalertService);
    private readonly fb = inject(FormBuilder);
    private readonly cup$ = inject(CupService);
    readonly tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent});
    readonly table = viewChild('table', { read: TableCupsComponent});
    cupData = signal<CupsAPP_PAGE | null>(null);
    paramPaginate = signal<any>(queries.paramsPage);
    barActions: BarActions = {
        edit: true,
        delete: true,
        clean: true
    }
    tabs: tabsControls[] = [
        {
            active: true,
            idConnect: 'cups-create',
            label: 'Nuevo Cup'
        },
        {
            active: false,
            idConnect: 'cup-list',
            label: 'Cups'
        },
        {
            active: false,
            idConnect: 'cup-reports',
            label: 'Reportes'
        }
    ];
    form: FormGroup;
    formCupClone: CupsDTO_APP;
    formCup: IForm<CupsDTO_APP> = {
        birth: [false],
        birthTypeId: [''],
        code: [''],
        current: [false],
        genderId: [''],
        levelId: [''],
        maxAge: [''],
        minAge: [''],
        name: ['', [ValidateStringEmpty()]],
        nonInvasiveProcedure: [false],
        points: [''],
        ripsConceptId: [''],
        scopeId: [''],
        serviceTypeId: [''],
        status: [false],
        surgicalGroupId: [''],
        unique: [false],
        uvr: [''],
        uvt: ['']
    }
    cupList = signal<CupsAPP[]>([]);

    constructor() {
        this.form = this.fb.group(this.formCup);
        this.formCupClone = ngFormHelper.unboxProperties(this.formCup);
    }

    ngOnInit(): void {
        this.queryCupPage()
    }

    queryCupPage() {
        this.cup$.getAllPage().subscribe(data => this.cupData.set(data));
    }

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.reset();
        else if (e === 'clean') this.cleanTdetail();
    }

    save() {
        if (this.form.valid) {
            this.swal$.loading();
            this.cup$.post(this.form.value).subscribe({
                next: () => {
                    this.swal$.formSave('success');
                    this.queryCupPage();
                    this.reset();
                    this.showTab(1);
                },
                error: () => this.swal$.formSave('error')
            });
        } else {
            this.swal$.formSave('warning');
        }
    }

    reset() {
        this.form.reset(this.formCupClone);
    }

    showTab(id: number) {
        this.tabController()?.showTab(this.tabs[id].idConnect);
    }

    cleanTdetail() {
        this.table()?.clean();
    }

    paginate(e: any) {
        this.paramPaginate.set(e);
        this.queryCupPage();
    }
}
