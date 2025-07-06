import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { ActionName, BarActions, Institutions_APP, Institutions_APPDTO, tabsControls } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { InstitutionsService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormInstitutionsComponent } from './form-institutions/form-institutions.component';
import { LocalInstitutionsService } from './local-institutions.service';
import { TableInstitutionsComponent } from './table-institutions/table-institutions.component';
import { TdetailInstitutionsComponent } from './tdetail-institutions/tdetail-institutions.component';

@Component({
    selector: 'app-institutions',
    standalone: true,
    imports: [
        BladePanelComponent,
        CommonModule,
        BladeBoxPanelComponent,
        DirectivesModule,
        BladeTabsHorizontalComponent,
        TableInstitutionsComponent,
        TdetailInstitutionsComponent,
        BladeDialogComponent,
        CardBasicTextComponent,
        FormInstitutionsComponent
    ],
    templateUrl: './institutions.component.html'
})
export class InstitutionsComponent {
    private readonly destroyRef = inject(DestroyRef);
    private readonly local$ = inject(LocalInstitutionsService);
    private readonly swal$ = inject(SweetalertService);
    readonly tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent});
    readonly formCreate = viewChild('formCreate', { read: FormInstitutionsComponent});
    readonly formUpdate = viewChild('formUpdate', { read: FormInstitutionsComponent});
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent});
    readonly table = viewChild('table', { read: TableInstitutionsComponent});
    institutions$ = inject(InstitutionsService);
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
            idConnect: 'tab-institution-new',
            label: 'Crear'
        },
        {
            active: false,
            idConnect: 'tab-institution-list',
            label: 'Lista'
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
        else if (e === 'clean') this.table()?.clean();
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

    private save() {
        const form = this.formCreate()?.form;
        if (form?.valid) {
            this.swal$.loading();
            this.institutions$.post(form.value).subscribe({
                next: (value) => {
                    this.local$.entityEmit(value);
                },
                complete: () => {
                    this.swal$.formSave('success');
                    this.formCreate()?.reset();
                    this.table()?.QueryInstitutions();
                    this.showTab(1);
                },
                error: () => this.swal$.formSave('error')
            });
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
            this.institutions$.update(data!.id, form.value).subscribe({
                next: (value) => {
                    this.local$.entityEmit(value);
                },
                complete: () => {
                    this.dialogUpdate()?.hide();
                    this.swal$.formSave('success');
                    this.table()?.QueryInstitutions();
                    this.showTab(1);
                },
                error: () => this.swal$.formSave('error')
            })
        } else {
            this.swal$.formSave('warning');
            this.formUpdate()?.markAlltouched();
        }
    }

    private deleteAlert(data: Institutions_APP | null) {
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

    private delete(data: Institutions_APP) {
        this.swal$.loading();
        this.institutions$.delete(data.id).subscribe({
            next: () => {
                const text = data.name + ' ha sido liminado';
                this.swal$.alertSimple(text, 'success');
                this.table()?.QueryInstitutions();
                this.local$.entityEmit(null);
            }
        });
    }

    private dataEdit(data: Institutions_APP | null) {
        if(data) {
            const values: Institutions_APPDTO = {
                address: data.address,
                complexityLevelId: data.complexityLevel.id,
                departmentId: data.department.id,
                email: data.email,
                legalNatureId: data.legalNature.id,
                municipalityId: data.municipality.id,
                name: data.name,
                phone: data.phone,
                referralTypeId: data.referralType.id,
                roomCode: data.roomCode
            }
            this.formUpdate()?.setValues(values);
        }
    }

    showTab(id: number) {
        this.tabController()?.showTab(this.tabs[id].idConnect);
    }
}
