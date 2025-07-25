import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { ActionName, AdministrativeEntity_APP, BarActions, tabsControls } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { AdministrativeEntitiesService } from '@services/api';
import { SweetalertService } from '@services/app';
import { DetailAdministrativeEntityComponent } from './detail-administrative-entity/detail-administrative-entity.component';
import { FormDateEntityComponent } from './form-date-entity/form-date-entity.component';
import { LocalAdministrativeEntitiesService } from './local-administrative-entities.service';
import { TablePlatformEntityComponent } from './table-platform-entity/table-platform-entity.component';

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
        DetailAdministrativeEntityComponent,
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

    canGoOut(): Promise<boolean> | boolean {
        return this.swal$.canOutup(this.formCreate()?.form.dirty)
    }

    barAction(e: ActionName) {
        const data = this.local$.getEntity();
        if (e === 'save') this.save();
        else if (e === 'reset') this.formCreate()?.reset();
        else if (e === 'clean') this.cleanDetail();
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

    private showTab(id: number) {
        this.tabController()?.showTab(this.tabs[id].idConnect);
    }

    private save() {
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
                    this.showTab(1);
                },
                error: () => this.swal$.formSave('error')
            })
        } else {
            this.swal$.formSave('warning');
            this.formCreate()?.markAlltouched();
        }
    }

    private update() {
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
                    this.showTab(1);
                },
                error: () => this.swal$.formSave('error')
            })
        } else {
            this.swal$.formSave('warning');
            this.formUpdate()?.markAlltouched();
        }
    }

    private deleteAlert(data: AdministrativeEntity_APP | null) {
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

    private delete(data: AdministrativeEntity_APP) {
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

    private cleanDetail() {
        this.table()?.clean();
    }

    private dataEdit(data: AdministrativeEntity_APP | null) {
        if(data) {
            this.formUpdate()?.setValues(data);
        }
    }
}
