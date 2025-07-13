import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { TableCareProgramsComponent } from './table-care-programs/table-care-programs.component';
import { FormCareProgramsComponent } from './form-care-programs/form-care-programs.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { SweetalertService } from '@services/app';
import { CareProgramsService } from '@services/api';
import { LocalCareProgramsService } from './local-care-programs.service';
import { ActionName, BarActions, CarePrograms_APP, CarePrograms_APPDTO, tabsControls } from '@interfaces/index';

@Component({
    selector: 'care-programs',
    standalone: true,
    templateUrl: './care-programs.component.html',
    imports: [
        BladePanelComponent,
        BladeDialogComponent,
        BladeBoxPanelComponent,
        CardBasicTextComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule,
        TableCareProgramsComponent,
        FormCareProgramsComponent
    ]
})
export class CareProgramsComponent {
    private readonly destroyRef = inject(DestroyRef);
    private readonly swal$ = inject(SweetalertService);
    private readonly CarePrograms$ = inject(CareProgramsService);
    private readonly local$ = inject(LocalCareProgramsService);
    readonly tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent});
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent});
    readonly formCreate = viewChild('formCreate', { read: FormCareProgramsComponent});
    readonly formUpdate = viewChild('formUpdate', { read: FormCareProgramsComponent});
    readonly table = viewChild('table', { read: TableCareProgramsComponent});
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
            idConnect: 'add-program',
            label: 'Crear entidad'
        },
        {
            active: false,
            idConnect: 'list-programs',
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

    private showTab(id: number) {
        this.tabController()?.showTab(this.tabs[id].idConnect);
    }

    private save() {
        const form = this.formCreate()?.form;
        console.log("form", form?.value);
        /*if (form?.valid) {
            this.swal$.loading();
            this.CarePrograms$.post(form.value).subscribe({
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
        }*/
    }

    private update() {
        const form = this.formUpdate()?.form;
        if (form?.valid) {
            this.swal$.loading();
            const data = this.local$.getEntity();
            this.CarePrograms$.update(data!.id, form.value).subscribe({
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

    private deleteAlert(data: CarePrograms_APP | null) {
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

    private delete(data: CarePrograms_APP) {
        this.swal$.loading();
        this.CarePrograms$.delete(data.id).subscribe({
            next: () => {
                const text = data.name + ' ha sido liminado';
                this.swal$.alertSimple(text, 'success');
                this.table()?.queryAdministrativeEntities();
                this.local$.entityEmit(null);
            }
        });
    }

    private cleanTdetail() {
        this.table()?.clean();
    }

    private dataEdit(data: CarePrograms_APP | null) {
        if(data) {
            const values: CarePrograms_APPDTO = {
                diagnosisIds: data.diagnoses.map(x => x.id),
                genderId: data.gender.id,
                historyTypeIds: data.historyTypes.map(x => x.id),
                maxAge: data.maxAge,
                minAge: data.minAge,
                name: data.name,
                programServices: [],
                shortName: data.shortName
            }
            this.formUpdate()?.setValues(values);
        }
    }

}
