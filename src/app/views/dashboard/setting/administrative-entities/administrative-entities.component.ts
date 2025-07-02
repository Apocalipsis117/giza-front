import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { ActionName, AdministrativeEntity_APP, AdministrativeEntity_APPDTO, BarActions, tabsControls } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { AdministrativeEntitiesService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormDateEntityComponent } from './form-date-entity/form-date-entity.component';
import { LocalAdministrativeEntitiesService } from './local-administrative-entities.service';
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
        TdetailAdministrativeEntityComponent,
        BladeDialogComponent,
        CardBasicTextComponent
    ]
})
export class AdministrativeEntitiesComponent {
    private readonly destroyRef = inject(DestroyRef);
    private readonly swal$ = inject(SweetalertService);
    private readonly adminEntities$ = inject(AdministrativeEntitiesService);
    private readonly local$ = inject(LocalAdministrativeEntitiesService);
    readonly tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent});
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent});
    readonly formCreate = viewChild('formCreate', { read: FormDateEntityComponent});
    readonly formUpdate = viewChild('formUpdate', { read: FormDateEntityComponent});
    readonly table = viewChild('table', { read: TablePlatformEntityComponent});
    actionsDetail: BarActions = {
        edit: true,
        delete: true,
        clean: true
    }
    actionsUpdate: BarActions = {
        update: true,
        return: true
    }
    tabs: tabsControls[] = [
        {
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

    constructor() {
        this.destroyRef.onDestroy(() => {
            this.local$.entityEmit(null);
        })
    }


    barAction(e: ActionName) {
        const data = this.local$.getEntity();
        if (e === 'save') this.save();
        else if (e === 'reset') this.formCreate()?.reset();
        else if (e === 'clean') this.cleanTdetail();
        else if (e === 'edit') {
            if(data) {
                this.dataEdit(data);
                this.dialogUpdate()?.show();
            } else {
                this.swal$.alertSimple('Debe seleccionar una Entidad', 'info');
            }
        }
        else if (e === 'delete') {
            this.deleteAlert(data);
        }
        else if (e === 'update') this.update();
        else if (e === 'return') {
            this.dataEdit(data)
            this.swal$.alertSimple('Valores originales cargados.', 'success');
        }
    }

    save() {
        const form = this.formCreate()?.form;
        if (form?.valid) {
            this.swal$.loading();
            this.adminEntities$.post(form.value).subscribe({
                next: (value) => {
                    this.local$.entityEmit(value);
                },
                complete: () => {
                    this.swal$.formSave('success');
                    this.formCreate()?.reset();
                    this.table()?.queryAdministrativeEntities();
                    this.tabController()?.showTab(this.tabs[1].idConnect);
                },
                error: () => this.swal$.formSave('error')
            })
        } else {
            this.swal$.formSave('warning');
            this.formCreate()?.markAlltouched();
        }
    }

    update() {
        const form = this.formUpdate()?.form;
        if (form?.valid) {
            this.swal$.loading();
            const data = this.local$.getEntity();
            this.adminEntities$.update(data!.id, form.value).subscribe({
                next: (value) => {
                    this.local$.entityEmit(value);
                },
                complete: () => {
                    this.dialogUpdate()?.hide();
                    this.swal$.formSave('success');
                    this.table()?.queryAdministrativeEntities();
                    this.tabController()?.showTab(this.tabs[1].idConnect);
                },
                error: () => this.swal$.formSave('error')
            })
        } else {
            this.swal$.formSave('warning');
            this.formUpdate()?.markAlltouched();
        }
    }

    deleteAlert(data: AdministrativeEntity_APP | null) {
        if(data) {
            this.swal$.toastConfirm('warning', {
                text: 'Seguro que desea elimina ' + data.name,
                title: 'Confirmar'
            }).then(value => {
                if(value.isConfirmed) {
                    this.delete(data);
                }
            })
        }
    }

    delete(data: AdministrativeEntity_APP) {
        this.swal$.loading();
        this.adminEntities$.delete(data.id).subscribe({
            next: () => {
                const text = data.name + ' ha sido liminado';
                this.swal$.alertSimple(text, 'success');
                this.table()?.queryAdministrativeEntities();
                this.local$.entityEmit(null);
            }
        });
    }

    cleanTdetail() {
        this.table()?.clean();
    }

    dataEdit(data: AdministrativeEntity_APP | null) {
        if(data) {
            const values: AdministrativeEntity_APPDTO = {
                address: data.address,
                authorizationLength: data.authorizationLength,
                code: data.code,
                departmentId: data.department.id,
                electronicBillingEmail: data.electronicBillingEmail,
                email: data.email,
                filingAddress: data.filingAddress,
                municipalityId: data.municipality.id,
                name: data.name,
                nit: data.nit,
                otherData: data.otherData,
                phone: data.phone,
                regimeId: data.regime.id,
                reportResolution256: data.reportResolution256,
                requiresAnnex2: data.requiresAnnex2,
                soat: data.soat,
                status: data.status,
                templateResolution1552: data.templateResolution1552
            }
            this.formUpdate()?.setValues(values);
        }
    }
}
