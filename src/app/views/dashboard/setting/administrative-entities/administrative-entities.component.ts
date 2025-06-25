import { Component, inject, signal, viewChild } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { queries } from '@helpers/index';
import { AdministrativeEntitiesAPP_PAGE } from '@interfaces/app';
import { ActionName, BarActions, tabsControls } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { AdministrativeEntitiesService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormDateEntityComponent } from './form-date-entity/form-date-entity.component';
import { TablePlatformEntityComponent } from './table-platform-entity/table-platform-entity.component';
import { TdetailAdministrativeEntityComponent } from './tdetail-administrative-entity/tdetail-administrative-entity.component';

@Component({
    selector: 'administrative-entities',
    standalone: true,
    templateUrl: './administrative-entities.component.html',
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule,
        FormDateEntityComponent,
        TablePlatformEntityComponent,
        TdetailAdministrativeEntityComponent
    ]
})
export class AdministrativeEntitiesComponent {
    private readonly adminEntities$ = inject(AdministrativeEntitiesService);
    private readonly swal$ = inject(SweetalertService);
    readonly tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent});
    readonly formDateEntityRef = viewChild('formDateEntityRef', { read: FormDateEntityComponent});
    readonly table = viewChild('table', { read: TablePlatformEntityComponent});
    administrativeEntities = signal<AdministrativeEntitiesAPP_PAGE | null>(null);
    actionsDetail: BarActions = {
        edit: true,
        delete: true,
        clean: true
    }
    tabs: tabsControls[] = [{
        active: true,
        idConnect: 'add-entity',
        label: 'Crear entidad'
    },
    {
        active: false,
        idConnect: 'add-platform',
        label: 'Entidades'
    }
    ];

    paramPaginate = signal<any>(queries.paramsPage);

    ngOnInit(): void {
        this.queryAdministrativeEntities()
    }

    queryAdministrativeEntities() {
        this.adminEntities$.getAllPage(this.paramPaginate()).subscribe(data => this.administrativeEntities.set(data))
    }

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.formDateEntityRef()?.reset();
        else if (e === 'clean') this.cleanTdetail();
    }

    save() {
        const form = this.formDateEntityRef()?.form;
        console.log("form", form?.value);
        if (form?.valid) {
            this.swal$.loading();
            this.adminEntities$.post(form.value).subscribe({
                complete: () => {
                    this.swal$.formSave('success');
                    this.formDateEntityRef()?.reset();
                    this.queryAdministrativeEntities();
                    this.tabController()?.showTab(this.tabs[1].idConnect);
                },
                error: () => this.swal$.formSave('error')
            })
        } else {
            this.swal$.formSave('warning')
        }
    }

    cleanTdetail() {
        this.table()?.clean();
    }

    paginate(e: any) {
        this.paramPaginate.set(e);
        this.queryAdministrativeEntities();
    }
}
