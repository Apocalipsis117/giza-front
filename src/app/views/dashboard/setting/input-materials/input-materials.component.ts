import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { TableInputMaterialsComponent } from './table-input-materials/table-input-materials.component';
import { FormInputMaterialsComponent } from './form-input-materials/form-input-materials.component';
import { DetailInputMaterialsComponent } from './detail-input-materials/detail-input-materials.component';
import { LocalInputMaterialsService } from './local-input-materials.service';
import { SweetalertService } from '@services/app';
import { InputMaterialsService } from 'src/app/core/services/api/setting/input-materials.service';
import { ActionName, BarActions, InputMaterials_APP, InputMaterials_APPDTO, tabsControls } from '@interfaces/index';

@Component({
    selector: 'input-materials',
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        DirectivesModule,
        BladeTabsHorizontalComponent,
        BladeDialogComponent,
        CardBasicTextComponent,
        TableInputMaterialsComponent,
        FormInputMaterialsComponent,
        DetailInputMaterialsComponent
    ],
    templateUrl: './input-materials.component.html'
})
export class InputMaterialsComponent {
    private readonly destroyRef = inject(DestroyRef);
    private readonly local$ = inject(LocalInputMaterialsService);
    private readonly swal$ = inject(SweetalertService);
    readonly tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent});
    readonly formCreate = viewChild('formCreate', { read: FormInputMaterialsComponent});
    readonly formUpdate = viewChild('formUpdate', { read: FormInputMaterialsComponent});
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent});
    readonly table = viewChild('table', { read: TableInputMaterialsComponent});
    InputMaterials$ = inject(InputMaterialsService);
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
            this.InputMaterials$.post(form.value).subscribe({
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
            this.InputMaterials$.update(data!.id, form.value).subscribe({
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

    private deleteAlert(data: InputMaterials_APP | null) {
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

    private delete(data: InputMaterials_APP) {
        this.swal$.loading();
        this.InputMaterials$.delete(data.id).subscribe({
            next: () => {
                const text = data.name + ' ha sido liminado';
                this.swal$.alertSimple(text, 'success');
                this.table()?.QueryInstitutions();
                this.local$.entityEmit(null);
            }
        });
    }

    private dataEdit(data: InputMaterials_APP | null) {
        if(data) {
            const values: InputMaterials_APPDTO = {
                billable: data.billable,
                manualInputMaterialsTariffIds: data.manualInputMaterialsTariffs.map(x => x.id),
                materialClassificationId: data.materialClassification.id,
                name: data.name,
                ripsConceptId: data.ripsConcept.id,
                status: data.status
            }
            this.formUpdate()?.setValues(values);
        }
    }

    showTab(id: number) {
        this.tabController()?.showTab(this.tabs[id].idConnect);
    }
}
