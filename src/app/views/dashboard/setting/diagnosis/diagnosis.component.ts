import { Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { ActionName, BarActions, Diagnosis_APP, Diagnosis_APPDTO, tabsControls } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { DiagnosisService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormDiagnosisComponent } from './form-diagnosis/form-diagnosis.component';
import { LocalDiagnosisService } from './local-diagnosis.service';
import { TableDiagnosisComponent } from './table-diagnosis/table-diagnosis.component';
import { DetailDiagnosisComponent } from './detail-diagnosis/detail-diagnosis.component';

@Component({
    selector: 'app-diagnosis',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        DirectivesModule,
        DetailDiagnosisComponent,
        TableDiagnosisComponent,
        CardBasicTextComponent,
        BladeTabsHorizontalComponent,
        BladeDialogComponent,
        FormDiagnosisComponent
    ],
    templateUrl: './diagnosis.component.html'
})
export class DiagnosisComponent {
    private readonly destroyRef = inject(DestroyRef);
    private readonly swal$ = inject(SweetalertService);
    private readonly diagnosis$ = inject(DiagnosisService);
    private readonly local$ = inject(LocalDiagnosisService);
    readonly tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent});
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent});
    readonly formCreate = viewChild('formCreate', { read: FormDiagnosisComponent});
    readonly formUpdate = viewChild('formUpdate', { read: FormDiagnosisComponent});
    readonly table = viewChild('table', { read: TableDiagnosisComponent});
    diagnosis = signal<Diagnosis_APP|null>(null);
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
        this.local$.readEntity$.subscribe({
            next: (value) => {
                this.diagnosis.set(value);
            }
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
            this.diagnosis$.post(form.value).subscribe({
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
            this.diagnosis$.update(data!.id, form.value).subscribe({
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

    private deleteAlert(data: Diagnosis_APP | null) {
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

    private delete(data: Diagnosis_APP) {
        this.swal$.loading();
        this.diagnosis$.delete(data.id).subscribe({
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

    private dataEdit(data: Diagnosis_APP | null) {
        if(data) {
            const values: Diagnosis_APPDTO = {
                active: data.active,
                categoryId: data.category ? data.category.id : null,
                chapterId: data.chapter ? data.chapter.id : null,
                code: data.code,
                common: data.common,
                genderId: data.gender ? data.gender.id : null,
                hospitalization: data.hospitalization,
                maxAge: data.maxAge,
                minAge: data.minAge,
                name: data.name,
                notify: data.notify,
                procedure: data.procedure,
                subCategoryId: data.subCategory ? data.subCategory.id : null
            }
            this.formUpdate()?.setValues(values);
        }
    }
}
