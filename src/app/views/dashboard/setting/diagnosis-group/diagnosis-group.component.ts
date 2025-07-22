import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { FormDiagnosisGroupComponent } from './form-diagnosis-group/form-diagnosis-group.component';
import { TableDiagnosisGroupComponent } from './table-diagnosis-group/table-diagnosis-group.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { DirectivesModule } from '@directive/module';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { SweetalertService } from '@services/app';
import { DiagnosisGroupService } from 'src/app/core/services/api/setting/diagnosis-group.service';
import { LocalDiagnosisGroupService } from './local-diagnosis-group.service';
import { ActionName, BarActions, DiagnosisGroup_APP, DiagnosisGroup_APPDTO, tabsControls } from '@interfaces/index';
import { DetailDiagnosisGroupComponent } from './detail-diagnosis-group/detail-diagnosis-group.component';

@Component({
    selector: 'diagnostic-group',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule,
        FormDiagnosisGroupComponent,
        TableDiagnosisGroupComponent,
        DetailDiagnosisGroupComponent,
        BladeDialogComponent,
        CardBasicTextComponent
    ],
    templateUrl: './diagnosis-group.component.html'
})
export class DiagnosisGroupComponent {
    private readonly destroyRef = inject(DestroyRef);
    private readonly swal$ = inject(SweetalertService);
    private readonly DiagnosisGroup$ = inject(DiagnosisGroupService);
    private readonly local$ = inject(LocalDiagnosisGroupService);
    readonly tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent});
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent});
    readonly formCreate = viewChild('formCreate', { read: FormDiagnosisGroupComponent});
    readonly formUpdate = viewChild('formUpdate', { read: FormDiagnosisGroupComponent});
    readonly table = viewChild('table', { read: TableDiagnosisGroupComponent});
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
            label: 'Crear grupo'
        },
        {
            active: false,
            idConnect: 'list-groups',
            label: 'Grupos diagnosticos'
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
            this.DiagnosisGroup$.post(form.value).subscribe({
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
            this.DiagnosisGroup$.update(data!.id, form.value).subscribe({
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

    private deleteAlert(data: DiagnosisGroup_APP | null) {
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

    private delete(data: DiagnosisGroup_APP) {
        this.swal$.loading();
        this.DiagnosisGroup$.delete(data.id).subscribe({
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

    private dataEdit(data: DiagnosisGroup_APP | null) {
        if(data) {
            const values: DiagnosisGroup_APPDTO = {
                diagnosisIds: data.diagnoses.map(x => x.id),
                name: data.name
            }
            this.formUpdate()?.setValues(values);
        }
    }

}
